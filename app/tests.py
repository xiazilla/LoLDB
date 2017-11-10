from models import *
from pymongo import *
import requests
import unittest


class TestAPI(unittest.TestCase):

    def setUp(self):
        self.base_url = "https://loldbapi.appspot.com/"
        self.search = search()


    # create_blurb tests
    def test_create_blurb(self):
        elem = "the cat in the hat"
        value = "cat"
        blurb = self.search.create_blurb(elem, value)
        self.assertEqual(blurb, "the cat in the hat\n")

    def test_create_blurb_not_found(self):
        elem = "the cat in the hat"
        value = "dog"
        blurb = self.search.create_blurb(elem, value)
        self.assertEqual(blurb, "")


    # create_blurb_from_list tests
    def test_create_blurb_from_list(self):
        elem = ["the", "cat", "in", "the", "hat"]
        value = "cat"
        blurb = self.search.create_blurb_from_list(elem, value)
        self.assertEqual(blurb, "cat\n")

    def test_create_blurb_from_list(self):
        elem = ["the", "cat", "in", "the", "hat"]
        value = "bat"
        blurb = self.search.create_blurb_from_list(elem, value)
        self.assertEqual(blurb, "")

    def test_create_blurb_from_list_via_create_blurb(self):
        elem = ["the", "cat", "in", "the", "hat"]
        value = "cat"
        blurb = self.search.create_blurb(elem, value)
        self.assertEqual(blurb, "cat\n")


    # create_blurb_from_dict tests
    def test_create_blurb_from_dict(self):
        elem = {"a": "the", "b": "cat", "c": "in", "d": "the", "e": "hat"}
        value = "cat"
        blurb = self.search.create_blurb_from_dict(elem, value)
        self.assertEqual(blurb, "cat\n")

    def test_create_blurb_from_dict_not_found(self):
        elem = {"a": "the", "b": "cat", "c": "in", "d": "the", "e": "hat"}
        value = "smack"
        blurb = self.search.create_blurb_from_dict(elem, value)
        self.assertEqual(blurb, "")

    def test_create_blurb_from_dict_via_create_blurb(self):
        elem = {"a": "the", "b": "cat", "c": "in", "d": "the", "e": "hat"}
        value = "cat"
        blurb = self.search.create_blurb(elem, value)
        self.assertEqual(blurb, "cat\n")


    # champ_blurb tests
    def test_champ_blurb(self):
        url = self.base_url + "/api/champs/Jax"
        response = requests.get(url).json()["result"][0]
        blurb = self.search.champion_blurb("definitely not Jax", response)
        self.assertEqual(blurb, "Jax, Grandmaster at Arms. It is seldom the"
            + " case where a champion is defined by his actions after joining..."
            + " definitely not Jax")


    # item_blurb tests
    def test_item_blurb(self):
        url = self.base_url + "/api/items/Dagger"
        response = requests.get(url).json()["result"][0]
        blurb = self.search.item_blurb("definitely not Dagger", response)
        self.assertEqual(blurb, "Dagger +12% Attack Speed... definitely not Dagger")


    # cannot test matches because they can update when database refreshes :/


    # map_blurb tests
    def test_map_blurb(self):
        url = self.base_url + "/api/maps/Summoner's%20Rift"
        response = requests.get(url).json()["result"][0]
        blurb = self.search.map_blurb("definitely not Summoner's Rift",
            response, "Summoner's Rift")
        self.assertEqual(blurb, "Summoner's Rift The Summoner's Rift is the most"
            + " commonly used Field of Justice.")


if __name__ == '__main__':
    unittest.main()