import unittest
import requests
from pymongo import *


class TestAPI(unittest.TestCase):

    def setUp(self):
        self.base_url = "https://loldbapi.appspot.com/api"


    def test_all_champs(self):
        url = self.base_url + "/champs"
        response = requests.get(url).json()["result"]
        self.assertEqual(len(response), 138)


    def test_one_champ(self):
        url = self.base_url + "/champs/Jax"
        response = requests.get(url).json()["result"]
        self.assertEqual(len(response), 1)
        result = response[0]
        self.assertEqual(result["name"], "Jax")
        self.assertEqual(result["title"], "Grandmaster at Arms")
        self.assertEqual(result["id"], 24)
        self.assertEqual(result["spells"][0]["name"], "Leap Strike") 
        self.assertEqual(result["stats"]["armorperlevel"], 3)
        self.assertEqual(len(result["spells"]), 4)
        self.assertEqual(len(result["stats"]), 20)
        self.assertEqual(len(result["skins"]), 10)


    def test_bad_champ(self):
        url = self.base_url + "/champs/Monkey%20King"
        response = requests.get(url).json()["result"]
        self.assertEqual(response, "no champion with that name")


    def test_all_items(self):
        url = self.base_url + "/items"
        response = requests.get(url).json()["result"]
        self.assertEqual(len(response), 263)        


    def test_one_item(self):
        url = self.base_url + "/items/Dagger"
        response = requests.get(url).json()["result"]
        self.assertEqual(len(response), 1)
        result = response[0]
        self.assertEqual(result["name"], "Dagger")
        self.assertEqual(result["gold"]["total"], 300)
        self.assertEqual(result["id"], 1042)
        self.assertEqual(result["sanitizedDescription"], "+12% Attack Speed")
        self.assertEqual(len(result["maps"]), 7)


    def test_bad_item(self):
        url = self.base_url + "/items/Dagga"
        response = requests.get(url).json()["result"]
        self.assertEqual(response, "no item with that name")


    def test_all_matches(self):
        url = self.base_url + "/matches"
        response = requests.get(url).json()
        self.assertEqual(len(response["result"]), 20)


    def test_one_match(self):
        url = self.base_url + "/matches/2626065324"
        response = requests.get(url).json()["result"]
        self.assertEqual(len(response), 1)
        result = response[0]
        self.assertEqual(result["seasonId"], 9)
        self.assertEqual(result["queueId"], 420)
        self.assertEqual(result["gameId"], 2626065324)
        self.assertEqual(result["gameVersion"], "7.20.204.9809")
        self.assertEqual(result["platformId"], "NA1")
        self.assertEqual(result["gameMode"], "CLASSIC")
        self.assertEqual(result["mapId"], 11)
        self.assertEqual(result["gameType"], "MATCHED_GAME")
        self.assertEqual(result["gameDuration"], 1954)
        self.assertEqual(result["gameCreation"], 1508646666025)
        self.assertEqual(len(result["teams"]), 2)
        self.assertEqual(len(result["participants"]), 10)


    def test_all_maps(self):
        url = self.base_url + "/maps"
        response = requests.get(url).json()
        self.assertEqual(len(response["result"]), 4)


    def test_one_map(self):
        url = self.base_url + "/maps/The%20Crystal%20Scar"
        response = requests.get(url).json()["result"]
        self.assertEqual(len(response), 1)
        result = response[0]
        self.assertEqual(result["mapName"], "The Crystal Scar")
        self.assertEqual(result["mapId"], 8)
        self.assertEqual(len(result["champs"]), 4)
        self.assertEqual(len(result["items"]), 3)


if __name__ == '__main__':
    unittest.main()