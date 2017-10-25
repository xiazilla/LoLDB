import requests
import json
from pymongo import *

# IMPORTANT: Remember to check to this key or update before turnin
API_KEY = "RGAPI-392de077-2157-49e7-8e3b-b764ac34dcc7"

# Set up mongo connection
client = MongoClient("mongodb://root:root@localhost:27017")
db = client.loldb

# Dictionary of champion names and IDs
champion_names = {}
# Dictionary of item names and IDs
item_names = {}


##################################################
# createChampJSON
#
# Creates a JSON for champs and add it to database
#
# json_path the JSON file path name
# KEY the API Key
##################################################
def createChampJSON(json_path, KEY) :
    global champion_names
    # url to get champions and tags for query
    base_url = "https://na1.api.riotgames.com/lol/static-data/v3"
    tags = ["lore", "skins", "passive", "recommended", "spells", "stats"]
    # Append API Key and tags to URL
    request_url = base_url + "/champions?api_key=" + KEY + "".join("&tags="+t for t in tags)
    champ_list = requests.get(request_url).json()
    # Dragon URL
    dragon_url = "http://ddragon.leagueoflegends.com/cdn/img"
    # Iterate through the items
    minimized = {"data" : {} }
    for champ in champ_list["data"] :
        minimized["data"][champ] = {}
        min_champ_data = minimized["data"][champ]
        champ_data = champ_list["data"][champ]

        min_champ_data["id"] = champ_data["id"]
        min_champ_data["name"] = champ_data["name"]
        # Add the champion mapping to the dictionary
        champion_names[champ_data["name"]] = champ_data["id"]
        min_champ_data["title"] = champ_data["title"]
        min_champ_data["skins"] = champ_data["skins"]
        # Get the champion URL
        image_url = dragon_url + "/champion/loading/" + champ + "_0.jpg"
        min_champ_data["image"] = image_url
        min_champ_data["passive"] = champ_data["passive"]
        min_champ_data["recommended"] = champ_data["recommended"]
        min_champ_data["lore"] = champ_data["lore"]
        min_champ_data["spells"] = champ_data["spells"]
        min_champ_data["stats"] = champ_data["stats"]
    	# Add the champion to mongo
        db.champion.insert_one(min_champ_data)
    
    #with open(json_path, "w") as json_file :
    #    json.dump(minimized, json_file)
    #print ("Wrote json to: " + json_path)


#################################################
# createItemJSON
#
# Creates a JSON for items and add it to database
#
# json_path the JSON file path name
# KEY the API Key
#################################################
def createItemJSON(json_path, KEY) :
    global item_names
    # URL to get items and tags for query
    base_url = "https://na1.api.riotgames.com/lol/static-data/v3/items?locale=en_US"
    tags = ["all", "sanitizedDescription", "from", "into"]
    # Append API Key and tags to URL
    request_url = base_url + "".join("&tags="+t for t in tags) + "&api_key=" + KEY
    item_list = requests.get(request_url).json()
    # Dragon URL
    dragon_url = "http://ddragon.leagueoflegends.com/cdn/7.20.1/img/item/"
    # Iterate through the items
    # if statements needed because not all items have all attributes
    minimized = {"data" : {} }
    for item in item_list["data"] :
        minimized["data"][item] = {}
        min_item_data = minimized["data"][item]
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
        # Get the item URL
        image_url = dragon_url + item + ".png"
        min_item_data["image"] = image_url
        # Add the item to mongo
        db.item.insert_one(min_item_data)

    #with open(json_path, "w") as json_file :
    #    json.dump(minimized, json_file)
    #print ("Wrote json to: " + json_path)


###################################################
# createMatchJSON
#
# Creates a JSON for matches and add it to database
#
# json_path the JSON file path name
# KEY the API Key
###################################################
def createMatchJSON(json_path, KEY) :
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
        gameID_list.append(requests.get(request_mhistory_url).json()["matches"][0]["gameId"])
    
    # Get match info about the player's most recent match
    match_url = "https://na1.api.riotgames.com/lol/match/v3/matches/"
    for game_id in gameID_list:
        request_match_url = match_url + str(game_id) + "?api_key=" + KEY
        # Add the match to mongo
        db.match.insert_one(requests.get(request_match_url).json())        


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
        if block.find(c) != -1:
            champs.add(c)
    # Find items in this article and add the item's id
    for i in item_names:
        if i in block:
            items.add(item_names[i])
    return list(champs), list(items)

################################################
# createMapJSON
#
# Creates a JSON for maps and add it to database
#
# json_path the JSON file path name
# KEY the API Key
################################################
def createMapJSON(json_path, KEY) :
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
        data = {}
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
        data["mapId"] = map_id
        data["mapName"] = map_name
        data["image"] = map_image_url
        data["article"] = article
        block = parse_article(article)
        # Champs is by names; items is by IDs
        data["champs"], data["items"] = parse_article(article)
        print (data)
        minimized[map_name] = data
        db.map.insert_one(d)
        count += 1
    
    #with open(json_path, "w") as json_file :
    #    json.dump(minimized, json_file)
    #print ("Wrote json to: " + json_path)


if __name__ == "__main__" :
    # TODO
    # Remove documents from mongo before adding new ones OR
    # Update/Replace rows if they already exist instead of inserting
    createChampJSON("champions.json", API_KEY)
    createItemJSON("items.json", API_KEY)
    createMatchJSON("matches.json", API_KEY)
    createMapJSON("maps.json", API_KEY)
