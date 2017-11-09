# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START app]
import logging

# [START imports]
from flask import Flask, render_template, request
from flask import jsonify
from pymongo import MongoClient
import json
from flask_restful import Resource, Api
from bson.json_util import dumps
from flask import Response
import re
# [END imports]

# [START create_app]
app = Flask(__name__)
api = Api(app)
# [END create_app]


app.config['MONGO_DBNAME'] = 'loldb'
app.config['MONGO_URI'] = 'mongodb://root:root@104.197.227.107:27017/'

@app.route('/')

# [START form]
@app.route('/index.html')
def index():
    return render_template('index.html')
# [END form]

class ChampsAll(Resource):
    def get(self):
        client = MongoClient('mongodb://root:root@104.197.227.107:27017/')
        db = client.loldb
        output = []
        for c in db.champion.find():
            d = json.loads(dumps(c))
            output.append(d)
        js = json.dumps({'result': output})
        resp = Response(js,status=200,mimetype='application/json')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
api.add_resource(ChampsAll, '/api/champs')


class ChampsOne(Resource):
    def get(self, name):
        client = MongoClient('mongodb://root:root@104.197.227.107:27017/')
        db = client.loldb
        c = db.champion.find_one({'name' : name})
        output = []
        if c:
            d = json.loads(dumps(c))
            output.append(d)
        else:
            output = "no champion with that name"
        js = json.dumps({'result' : output})
        resp = Response(js,status=200,mimetype='application/json')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
api.add_resource(ChampsOne, '/api/champs/<name>')


class ItemsAll(Resource):
    def get(self):
        client = MongoClient('mongodb://root:root@104.197.227.107:27017/')
        db = client.loldb
        output = []
        for i in db.item.find():
            d = json.loads(dumps(i))
            output.append(d)
        js = json.dumps({'result' : output})
        resp = Response(js,status=200,mimetype='application/json')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
api.add_resource(ItemsAll, '/api/items')


class ItemsOne(Resource):
    def get(self, name):
        client = MongoClient('mongodb://root:root@104.197.227.107:27017/')
        db = client.loldb
        i = db.item.find_one({'name' : name})
        output = []
        if i:
            d = json.loads(dumps(i))
            output.append(d)
        else:
            output = "no item with that name"
        js = json.dumps({'result' : output})
        resp = Response(js,status=200,mimetype='application/json')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
api.add_resource(ItemsOne, '/api/items/<name>')


class MatchesAll(Resource):
    def get(self):
        client = MongoClient('mongodb://root:root@104.197.227.107:27017/')
        db = client.loldb
        output = []
        for m in db.match.find():
            d = json.loads(dumps(m))
            output.append(d)
        js = json.dumps({'result' : output})
        resp = Response(js,status=200,mimetype='application/json')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
api.add_resource(MatchesAll, '/api/matches') 


class MatchesOne(Resource):
    def get(self, id):
        client = MongoClient('mongodb://root:root@104.197.227.107:27017/')
        db = client.loldb
        m = db.match.find_one({'gameId' : int(id)})
        output = []
        if m:
            d = json.loads(dumps(m))
            output.append(d)
        else:
            output = "no matching match for match ID"
        js = json.dumps({'result' : output})
        resp = Response(js,status=200,mimetype='application/json')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
api.add_resource(MatchesOne, '/api/matches/<id>')


class MapsAll(Resource):
    def get(self):
        client = MongoClient('mongodb://root:root@104.197.227.107:27017/')
        db = client.loldb
        output = []
        for m in db.map.find():
            d = json.loads(dumps(m))
            output.append(d)
        js = json.dumps({'result' : output})
        resp = Response(js,status=200,mimetype='application/json')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
api.add_resource(MapsAll, '/api/maps')


class MapsOne(Resource):
    def get(self, name):
        client = MongoClient('mongodb://root:root@104.197.227.107:27017/')
        db = client.loldb
        m = db.map.find_one({'mapName' : name})
        output = []
        if m:
            d = json.loads(dumps(m))
            output.append(d)
        else:
            output = "no map with that name"
        js = json.dumps({'result' : output})
        resp = Response(js,status=200,mimetype='application/json')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
api.add_resource(MapsOne, '/api/maps/<name>')


class search(Resource):

    champNames = {"velkoz":"vel'koz", "khazix":"kha'zix", "kogmaw":"kog'maw", 
                    "reksai":"rek'sai", "chogath":"cho'gath"}

    #Lower and upper limits for the number of characters in a blurb
    LOWER_LIMIT = 100
    UPPER_LIMIT = 150

    # Search through a list for blurbs
    def create_blurb_from_list(self, doc, value):
        blurb = ""
        for i in doc:
            blurb += self.create_blurb(i, value)
        return blurb

   # Create blurb from the search value
    def create_blurb(self, elem, value):
        blurb = ""
        if type(elem) == dict:
            # nested dictionary, need to recursively parse
            blurb += self.create_blurb_from_dict(elem, value)
        elif type(elem) == list:
            # nested list, need to recursively parse
            blurb += self.create_blurb_from_list(elem, value)
        else:
            # all that's left are strings and numerical values
            try:
                if value in str(elem).lower():
                    blurb += str(elem) + "\n"
            except:
                # In case we get some words with strange characters
                pass
        return blurb

    # Search through a dictionary for blurbs
    def create_blurb_from_dict(self, doc, value):
        blurb = ""
        for key in doc.keys():
            blurb += self.create_blurb(doc[key], value)
        return blurb


    # Choose the blurb for champions
    def champion_blurb(self, topBlurb, doc):
        # Gets champion name
        result = doc["name"]
        # Gets champion title
        result += ", " + doc["title"] + "."
        # Check if we still need to append more
        if len(result) < self.LOWER_LIMIT:
            # Iterate to get part of the lore
            lore = iter(doc["lore"].split(" "))
            try:
                while len(result) < self.LOWER_LIMIT:
                    result += " " + lore.next()
            except StopIteration:
                # We should never run out of lore, but just in case
                pass
        # Check if we already added the top blurb
        if (topBlurb != doc["name"] and (topBlurb != doc["title"])
            and (topBlurb != doc["lore"])):
            result += "... " + topBlurb
        return result

    # Choose the blurb for items
    def item_blurb(self, topBlurb, doc):
        # Get item name
        result = doc["name"]
        # Iterate to get part of the sanitized description
        sanitizedDescription = iter(doc["sanitizedDescription"].split())
        try:
            while len(result) < self.UPPER_LIMIT:
                result += " " + sanitizedDescription.next()
        except StopIteration:
            # In case the description is too short
            pass
        # Check if we already added the top blurb
        if (topBlurb != doc["name"] and (topBlurb != doc["sanitizedDescription"])):
            result += "... " + topBlurb
        return result

    # Choose the blurb for matches
    def match_blurb(self, topBlurb, doc):
        # Get game mode
        result = doc["gameMode"]
        # Get the player names
        topBlurbAdded = False
        # Get all of the players in the match
        for i in doc["participantIdentities"]:
            summonerName = i["player"]["summonerName"]
            result += " " + summonerName + ","
            if topBlurb in summonerName.lower():
                topBlurbAdded = True
        # Check if we already added the top blurb
        if (topBlurb != doc["gameMode"] and not topBlurbAdded):
            result += "... " + topBlurb
        return result

    # Choose the blurb for matches
    def map_blurb(self, topBlurb, doc, value):
        # Get map name
        result = doc["mapName"]
        paragraphIter = iter(doc["article"]["sections"][0]["content"]["text"].split())
        try:
            # Iterate to get part of the article about the map
            while len(result) < self.UPPER_LIMIT:
                result += " " + paragraphIter.next()
        except StopIteration:
            # We should never run out of content, but just in case
            pass
        # Check if we already added the top blurb
        if value not in result:
            result += "... " + topBlurb
        return result

    # Trims blurbs to fit in the alloted blurb space per search result
    def trim_blurb(self, topBlurb, value):
        # Split top blurb by periods, question marks, and exclamation points
        # To get sentences
        blurbList = re.split("\.+|\?+|\!+", topBlurb)
        tempList = []
        # Find which sentence contains the search value
        index = 0
        valueIndex = -1
        for v in blurbList:
            tempList.append(v.lower())
            if value in tempList[index] and valueIndex < 0:
                valueIndex = index
            index += 1
        # Add additional sentences to the blurb if needed
        result = blurbList[valueIndex] + "."
        if len(result) < self.LOWER_LIMIT and valueIndex != 0:
            result = blurbList[valueIndex-1] + "." + result
        if len(result) < self.LOWER_LIMIT and valueIndex < len(blurbList)-1:
            result += blurbList[valueIndex+1] + "."
        return result

    # Choose the blurbs to be displayed as search results
    def select_blurb(self, blurbs, value, collection, doc):
        client = MongoClient('mongodb://root:root@104.197.227.107:27017/')
        db = client.loldb
        blurbsList = blurbs.split("\n")
        topBlurb = ""
        # Find the longest blurb
        for b in blurbsList:
            if value in b.lower():
                if len(b) > len(topBlurb):
                    topBlurb = b
        blurbLen = len(topBlurb)
        # If longest blurb is still too short, we need to make it longer
        if blurbLen < self.LOWER_LIMIT:
            if collection == db.champion:
                topBlurb = self.champion_blurb(topBlurb, doc)
            elif collection == db.item:
                topBlurb = self.item_blurb(topBlurb, doc)
            elif collection == db.match:
                topBlurb = self.match_blurb(topBlurb, doc)
            else:
                topBlurb = self.map_blurb(topBlurb, doc, value)

        elif blurbLen > self.UPPER_LIMIT:
            topBlurb = self.trim_blurb(topBlurb, value)

        print (topBlurb)
        return topBlurb

    # Search our database for the specified value
    def search_helper(self, output, collection, value):
        # Search the indexes for value; sort by relevancy
        # Cursor contains all search results for value from collection
        cursor = collection.find({"$text": {"$search": '"' + value + '"'}}, {"score": {"$meta": "textScore"}})
        cursor.sort([("score", {"$meta":"textScore"})])
        temp = []
        # doc is the json corresponding to the search
        for doc in cursor:
            d = {}
            d["page"] = doc['page']
            blurbs = self.create_blurb_from_dict(doc, value)
            d["blurb"] = self.select_blurb(blurbs, value, collection, doc)
            temp.append(d)
        output.append(temp)

    def get(self, value):
        client = MongoClient('mongodb://root:root@104.197.227.107:27017/')
        db = client.loldb
        output = []

        value = value.lower()
        if value in self.champNames:
            value = self.champNames[value]

        self.search_helper(output, db.champion, value)
        self.search_helper(output, db.item, value)
        self.search_helper(output, db.map, value)
        self.search_helper(output, db.match, value)

        js = json.dumps({'result' : output})
        resp = Response(js,status=200,mimetype='application/json')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
api.add_resource(search, '/search/<value>')


if __name__ == '__main__' :
    app.run(host='0.0.0.0',debug=True,port=5000)

# [END app]

