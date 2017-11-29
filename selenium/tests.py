from selenium import webdriver
import unittest
import time


class GUITests(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.get("http://loldb.me")


    # Test search bar
    def test_search_bar(self):
        driver = self.driver
        # check title
        self.assertEquals(driver.title, 'LoLDB')
        # check navbar
        elem = driver.find_element_by_css_selector('input[type="text"]')
        elem.send_keys('twisted')
        button = driver.find_element_by_css_selector('button[class="btn1"]')
        button.click()

        #Check for expected search results
        link = driver.find_element_by_link_text('https://loldb.me/champions/Twisted%20Fate')
        self.assertTrue(link is not None)
        
        link.click()
        #Check for Twisted Fate's passive by img src
        img = driver.find_element_by_xpath("//img[contains(@src,'https://ddragon.leagueoflegends.com/cdn/7.20.1/img/passive/Cardmaster_SealFate.png')]")
        self.assertTrue(img is not None)

        driver.close()


    # Test About link
    def test_about_link(self):
        driver = self.driver
        driver.find_element_by_link_text('About').click()

        #Check if the current page contains expected image
        img = driver.find_element_by_xpath("//img[contains(@src,'/static/media/wesley_headshot.0b4fc707.jpg')]")
        self.assertTrue(img is not None)

        driver.close()


    # Test Champ link
    def test_champ_link(self):
        driver = self.driver
        driver.find_element_by_link_text('Champions').click()

        #Check if the current page contains expected image
        img = driver.find_element_by_xpath("//img[contains(@src,'http://ddragon.leagueoflegends.com/cdn/7.20.1/img/champion/Shyvana.png')]")
        self.assertTrue(img is not None)

        driver.close()


    # Test Item link
    def test_item_link(self):
        driver = self.driver
        driver.find_element_by_link_text('Items').click()

        #Check if the current page contains expected image
        img = driver.find_element_by_xpath("//img[contains(@src,'http://ddragon.leagueoflegends.com/cdn/7.20.1/img/item/3076.png')]")
        self.assertTrue(img is not None)

        driver.close()


    # Test Matches link
    def test_matches_link(self):
        driver = self.driver
        driver.find_element_by_link_text('Matches').click()

        # #Check if the current page contains expected header
        element = driver.find_element_by_tag_name("h3").text
        self.assertEquals(element, "PRO HISTORY")

        driver.close()


    # Test Maps link
    def test_maps_link(self):
        driver = self.driver
        driver.find_element_by_link_text('Maps').click()

        # #Check if the current page contains expected header
        element = driver.find_element_by_tag_name("h2").text
        self.assertEquals(element, "MAPS")

        driver.close()    


if __name__ == '__main__':
    unittest.main()