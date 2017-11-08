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

    # Search through a list for blurbs
    def createBlurbFromList(self, doc, value):
        blurb = ""
        for i in doc:
            blurb += self.createBlurb(i, value)
        return blurb

   # Create blurb from the search value
    def createBlurb(self, elem, value):
        blurb = ""
        if type(elem) == dict:
            # nested dictionary, need to recursively parse
            blurb += self.createBlurbFromDict(elem, value)
        elif type(elem) == list:
            # nested list, need to recursively parse
            blurb += self.createBlurbFromList(elem, value)
        else:
            # all that's left are strings and numerical values
            try:
                if value.lower() in str(elem).lower():
                    blurb += str(elem) + "\n"
            except:
                pass
        return blurb

    # Search through a dictionary for blurbs
    def createBlurbFromDict(self, doc, value):
        blurb = ""
        for key in doc.keys():
            blurb += self.createBlurb(doc[key], value)
        return blurb

    def selectBlurb(self, blurbs, value):
        blurbs_list = blurbs.split("\n")
        top_blurb = ""
        for b in blurbs_list:
            if value in b:
                if len(b) > len(top_blurb):
                    top_blurb = b
        return top_blurb

    # Search our database for the specified value
    def searchHelper(self, output, collection, value):
        #cursor = collection.find({"$text": {"$search": value}})
        # Search the indexes for value; sort by relevancy
        #Cursor contains all search results for value from collection
        cursor = collection.find({"$text": {"$search": '"' + value + '"'}}, {"score": {"$meta": "textScore"}})
        cursor.sort([("score", {"$meta":"textScore"})])
        temp = []
        #v is the json corresponding to the search
        for v in cursor:
            temp.append(v['page'])
            blurbs = self.createBlurbFromDict(v, value)
            top_blurb = self.selectBlurb(blurbs, value)
        output.append(temp)

    def get(self, value):
        client = MongoClient('mongodb://root:root@104.197.227.107:27017/')
        db = client.loldb
        output = []

        if value in self.champNames:
            value = self.champNames[value]

        self.searchHelper(output, db.champion, value)
        self.searchHelper(output, db.item, value)
        self.searchHelper(output, db.map, value)
        self.searchHelper(output, db.match, value)

        js = json.dumps({'result' : output})
        resp = Response(js,status=200,mimetype='application/json')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
api.add_resource(search, '/search/<value>')


if __name__ == '__main__' :
    app.run(host='0.0.0.0',debug=True,port=5000)

# [END app]
