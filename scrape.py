import requests
import json
from pymongo import *

# IMPORTANT: Remember to check to this key or update before turnin
API_KEY = "RGAPI-392de077-2157-49e7-8e3b-b764ac34dcc7"
#API_KEY = "RGAPI-cefa420b-8a4f-4ee2-8cea-a8a0823e0956"

# Set up mongo connection
client = MongoClient("mongodb://root:root@localhost:27017")
db = client.loldb

# Site base URL
site_base_URL = "https://loldb.me"

# Dictionary of champion names and IDs
champion_names = {}
# Dictionary of riot names and IDs
riot_names = {}
# Dictionary of item names and IDs
item_names = {}
# Dictionary of recommended items
rec_items = {}


####################################################################
# add_rec_items
#
# Maps items used by champs by adding this champ to the set of users
#
# rec the recommended builds
# champ_id the id of the champion
####################################################################
def add_rec_items(champ_name, rec):
    for obj in rec:
        for blocks in obj["blocks"]:
            for b in blocks["items"]:
                try:
                    # Add champ to set
                    rec_items[str(b["id"])].add(champ_name)
                except KeyError:
                    # Make a set if it doesn't exist
                    rec_items[str(b["id"])] = {champ_name}

##################################################
# create_champ_json
#
# Creates a JSON for champs and add it to database
#
# json_path the JSON file path name
# KEY the API Key
##################################################
def create_champ_json(json_path, KEY) :
    global champion_names
    global rec_items
    # url to get champions and tags for query
    base_url = "https://na1.api.riotgames.com/lol/static-data/v3"
    tags = ["lore", "skins", "passive", "recommended", "spells", "stats", "tags"]
    # Append API Key and tags to URL
    request_url = base_url + "/champions?api_key=" + KEY + "".join("&tags="+t for t in tags)
    champ_list = requests.get(request_url).json()
    # Dragon URL
    dragon_url = "http://ddragon.leagueoflegends.com/cdn/7.20.1/img"
    # Iterate through the items
    minimized = {"data" : {} }
    for champ in champ_list["data"] :
        min_champ_data = {}
        champ_data = champ_list["data"][champ]

        min_champ_data["id"] = champ_data["id"]
        min_champ_data["name"] = champ_data["name"]
        min_champ_data["riotName"] = champ
        # Add the champion mapping to the dictionary
        champion_names[champ_data["name"]] = champ_data["id"]
        riot_names[champ_data["id"]] = champ
        min_champ_data["title"] = champ_data["title"]
        min_champ_data["skins"] = champ_data["skins"]
        # Get the champion URL
        image_url = dragon_url + "/champion/" + champ + ".png"
        min_champ_data["image"] = image_url
        min_champ_data["passive"] = champ_data["passive"]
        min_champ_data["recommended"] = champ_data["recommended"]
        # Populate recommended items
        add_rec_items(champ_data["name"], champ_data["recommended"])
        min_champ_data["lore"] = champ_data["lore"]
        # Populate spells
        spells = champ_data["spells"]
        min_champ_data["spells"] = []
        for s in spells:
            spell = {}
            spell["name"] = s["name"]
            spell["sanitizedDescription"] = s["sanitizedDescription"]
            spell["image"] = s["image"]["full"]
            spell["key"] = s["key"]
            min_champ_data["spells"].append(spell) 
        min_champ_data["stats"] = champ_data["stats"]
        min_champ_data["roles"] = champ_data["tags"]
        # Add page link
        page_URL = site_base_URL + "/champions/" + champ_data["name"]
        min_champ_data["page"] = page_URL.replace(" ", "%20")
        # Add the champion to mongo
        minimized["data"][champ] = min_champ_data
        db.champion.insert_one(min_champ_data)

    db.champion.create_index([("$**", TEXT)], weights={"name":5, "title":3, "skins":2, "recommended":2, "passive":2, "spells":2})
    #with open(json_path, "w") as json_file :
    #   json.dump(minimized, json_file)
    #print ("Wrote json to: " + json_path)


#################################################
# create_item_json
#
# Creates a JSON for items and add it to database
#
# json_path the JSON file path name
# KEY the API Key
#################################################
def create_item_json(json_path, KEY) :
    global item_names
    # URL to get items and tags for query
    base_url = "https://na1.api.riotgames.com/lol/static-data/v3/items?locale=en_US"
    tags = ["all", "sanitizedDescription", "from", "into", "tags"]
    # Append API Key and tags to URL
    request_url = base_url + "".join("&tags="+t for t in tags) + "&api_key=" + KEY
    item_list = requests.get(request_url).json()
    # Dragon URL
    dragon_url = "http://ddragon.leagueoflegends.com/cdn/7.20.1/img/item/"
    # Iterate through the items
    # if statements needed because not all items have all attributes
    minimized = {"data" : {} }
    for item in item_list["data"] :
        min_item_data = {}
        item_data = item_list["data"][item]

        min_item_data["id"] = item_data["id"]
        if("name" in item_data):
            min_item_data["name"] = item_data["name"]
            # Add the item mapping to the dictionary
            item_names[item_data["name"]] = item_data["id"]
        min_item_data["gold"] = item_data["gold"]
        if("sanitizedDescription" in item_data):
            min_item_data["sanitizedDescription"] = item_data["sanitizedDescription"]
        if("from" in item_data):
            min_item_data["from"] = item_data["from"]
        min_item_data["maps"] = item_data["maps"]
        if("into" in item_data):
            min_item_data["into"] = item_data["into"]
        if("tags" in item_data):
            min_item_data["categories"] = item_data["tags"]
        # Get the item URL
        image_url = dragon_url + item + ".png"
        min_item_data["image"] = image_url
        # Add frequently built on
        try:
            min_item_data["builtOn"] = list(rec_items[item])
        except KeyError:
            pass
        # Add page link
        min_item_data["page"] = site_base_URL + "/items/" + str(item_data["id"])
        # Add the item to mongo
        minimized["data"][item] = min_item_data
        db.item.insert_one(min_item_data)

    db.item.create_index([("$**", TEXT)], weights={"name":5})
    #with open(json_path, "w") as json_file :
    #   json.dump(minimized, json_file)
    #print ("Wrote json to: " + json_path)


###################################################
# create_match_json
#
# Creates a JSON for matches and add it to database
#
# json_path the JSON file path name
# KEY the API Key
###################################################
def create_match_json(json_path, KEY) :
    # URL to get Challenger Players
    challenger_url = "https://na1.api.riotgames.com/lol/league/v3/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key="
    # Append the API Key to Challenger URL
    request_challenger_url = challenger_url + KEY
    # Create a list of Challenger players' names
    challenger_list = requests.get(request_challenger_url).json()["entries"]
    
    # Sort Players by ranking, and create a list of top 20 players
    rankList = sorted(challenger_list, key=lambda k: k['leaguePoints'], reverse=True) 
    player_list = []
    count = 20
    for player in rankList:
        if (count == 0):
            break
        player_list.append(player["playerOrTeamName"])
        count -= 1
    
    # Get Summoner ID of each player in Player List
    base_url = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/"
    accountID_list = []
    for player in player_list:
        request_summoner = base_url + player + "?api_key=" + KEY
        accoundID = requests.get(request_summoner).json()["accountId"]
        accountID_list.append(accoundID)

    # Get match history of that Player
    mhistory_url = "https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/"
    gameID_list = []
    for acc_id in accountID_list:
        request_mhistory_url = mhistory_url + str(acc_id) + "/recent?api_key=" + KEY 
        # Get this player's most recent match
        mhistory_matches = requests.get(request_mhistory_url).json()["matches"]
        gameID = 0
        i = 0
        while gameID == 0:
            if mhistory_matches[i]["queue"] != 950:
                gameID = mhistory_matches[i]["gameId"]
            i += 1
        gameID_list.append(gameID)
    
    # Get info about summoner spells
    sum_spells = {}
    request_sum_url = "https://na1.api.riotgames.com/lol/static-data/v3/summoner-spells?locale=en_US&dataById=true&tags=all&api_key=" + KEY
    sum_spell_data = requests.get(request_sum_url).json()["data"]
    for i in sum_spell_data:
        sum_spells[i] = sum_spell_data[i]["key"]

    # Get match info about the player's most recent match
    minimized = {}
    match_url = "https://na1.api.riotgames.com/lol/match/v3/matches/"
    for game_id in gameID_list:
        request_match_url = match_url + str(game_id) + "?api_key=" + KEY
        match_data = requests.get(request_match_url).json()
        # Replace champion IDs with riot names and summoner spell IDs with keys for easier parsing
        participants = match_data["participants"]
        for p in participants:
            p["championName"] = riot_names[p["championId"]]
            p["spell1Id"] = sum_spells[str(p["spell1Id"])]
            p["spell2Id"] = sum_spells[str(p["spell2Id"])]
        # Add the match to mongo
        minimized[game_id] = match_data
        # Add page link
        match_data["page"] = site_base_URL + "/matches/" + str(game_id)
        db.match.insert_one(match_data)

    db.match.create_index([("$**", TEXT)])
    #with open(json_path, "w") as json_file :
    #   json.dump(minimized, json_file)
    #print ("Wrote json to: " + json_path)


###################################
# recursive_find
#
# Finds nested elements recursively
#
# elist a list of elements
# returns elements as a string
###################################
def recursive_find(elist):
    result = ""
    if len(elist["elements"]):
        for e in elist["elements"]:
            result += e["text"]
            result += recursive_find(e)
    return result

#######################################
# find_champs_and items
#
# Finds champs and items in the article
#
# content the content of a section
# returns the content as a string
#######################################
def find_champs_and_items(content):
    result = ""
    for i in content:
        # Check if text field exists
        if (isinstance(i, dict)):
            try:
                result += i["text"] + "\n"
            except KeyError:
                pass
            # Check if there are other elements to check
            try:
                result += recursive_find(i)
            except KeyError:
                pass
    return result

########################################
# parse_article
#
# Parses an article for champs and items
#
# article the article to parse
# returns found champs and items lists
########################################
def parse_article(article):
    # Sections is a list of sections
    sections = article["sections"]
    champs = set()
    items = set()
    block = ""
    # Iterate through every section
    for s in sections:
        block += find_champs_and_items(s["content"])
    # Find champions in this article and add his or her name
    for c in champion_names:
        if c in block:
            champs.add(c)
    # Find items in this article and add the item's id
    for i in item_names:
        if i in block:
            items.add(item_names[i])
    return list(champs), list(items)

################################################
# create_map_json
#
# Creates a JSON for maps and add it to database
#
# json_path the JSON file path name
# KEY the API Key
################################################
def create_map_json(json_path, KEY) :
    # URL to get Maps
    map_url = "https://na1.api.riotgames.com/lol/static-data/v3/maps?locale=en_US&api_key=" + KEY
    maps = requests.get(map_url).json()["data"]
    # Sort maps by their id for purposes
    mapID_list = sorted(maps, key=lambda k: int(k))
    # Get the article pertaining to the map
    search_url_beg = "http://leagueoflegends.wikia.com/api/v1/Search/List?query="
    search_url_end = "&limit=1&minArticleQuality=10&batch=1&namespaces=0%2C14"
    # Dragon URL
    dragon_url = "http://ddragon.leagueoflegends.com/cdn/7.20.1/img/map/"
    # Iterate through the maps
    count = 0
    minimized = {}
    for map_id in mapID_list:
        map_data = {}
        # Only 4 of the maps have sufficient data to be turned into models
        if count == 4:
            break
        instance = maps[map_id]
        map_name = instance["mapName"]
        # Get the article ID: 164860, 2048, 164375, 2915
        request_search_url = search_url_beg + map_name.replace(" ", "+") + search_url_end
        article_id = requests.get(request_search_url).json()["items"][0]["id"]
        # Get the article
        request_article_url = "http://leagueoflegends.wikia.com/api/v1/Articles/AsSimpleJson?id=" + str(article_id)
        article = requests.get(request_article_url).json()
        # Get the map image URL
        map_image_url = dragon_url + instance["image"]["full"]
        # Add the map to mongo
        map_data["mapId"] = int(map_id)
        map_data["mapName"] = map_name
        map_data["image"] = map_image_url
        map_data["article"] = article
        # Add page link
        page_URL = site_base_URL + "/maps/" + map_name
        map_data["page"] = page_URL.replace(" ", "%20")
        # Champs is by names; items is by IDs
        map_data["champs"], map_data["items"] = parse_article(article)
        minimized[map_name] = map_data
        db.map.insert_one(map_data)
        count += 1

    db.map.create_index([("$**", TEXT)], weights={"mapName":5}) 
    #with open(json_path, "w") as json_file :
    #   json.dump(minimized, json_file)
    #print ("Wrote json to: " + json_path)


###########################################
# drop_tables
#
# Drop all tables currently in the database
#
###########################################
def drop_tables() :
    # drop rows in tables
    db.champion.delete_many({})
    db.item.delete_many({})
    db.match.delete_many({})
    db.map.delete_many({})

    # drop indices
    db.champion.drop_indexes()
    db.item.drop_indexes()
    db.match.drop_indexes()
    db.map.drop_indexes()

###############################################################
# create_json
#
# Creates JSON for all models and insert them into the database
#
###############################################################
def create_json() :   
    create_champ_json("champions.json", API_KEY)
    create_item_json("items.json", API_KEY)
    create_match_json("matches.json", API_KEY)
    create_map_json("maps.json", API_KEY)


if __name__ == "__main__" :
    # Drop tables before insert
    drop_tables()
    # Create JSON and insert
    create_json()
