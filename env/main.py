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
# [END imports]

# [START create_app]
app = Flask(__name__)
# [END create_app]

@app.route('/')



# [START form]
@app.route('/index.html')
def index():
    return render_template('index.html')
# [END form]

@app.route('/404.html')
def notFound():
    return render_template('404.html')

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/botrk-single.html')
def botrk_single():
    return render_template('botrk-single.html')

@app.route('/champions.html')
def champions():
    return render_template('champions.html')

@app.route('/contact.html')
def contact():
    return render_template('contact.html')

@app.route('/duskblade-single.html')
def duskblade_single():
    return render_template('duskblade-single.html')

@app.route('/gallery.html')
def gallery():
    return render_template('gallery.html')

@app.route('/game-modes.html')
def game_modes():
    return render_template('game-modes.html')

@app.route('/header.html')
def header():
    return render_template('header.html')

@app.route('/items.html')
def items():
    return render_template('items.html')

@app.route('/kindred-single.html')
def kindred_single():
    return render_template('kindred-single.html')

@app.route('/lucidity-single.html')
def lucidity_single():
    return render_template('lucidity-single.html')

@app.route('/match1.html')
def match1():
    return render_template('match1.html')

@app.route('/match2.html')
def match2():
    return render_template('match2.html')

@app.route('/match3.html')
def match3():
    return render_template('match3.html')

@app.route('/matches.html')
def matches():
    return render_template('matches.html')

@app.route('/riven-single.html')
def riven_single():
    return render_template('riven-single.html')

@app.route('/service.html')
def service():
    return render_template('service.html')

@app.route('/single-portfolio.html')
def single_portfolio():
    return render_template('single-portfolio.html')

@app.route('/single-post.html')
def single_post():
    return render_template('single-post.html')

@app.route('/summoners-rift.html')
def summoners_rift():
    return render_template('summoners-rift.html')

@app.route('/twisted-treeline.html')
def twisted_treeline():
    return render_template('twisted-treeline.html')

@app.route('/urgot-single.html')
def urgot_single():
    return render_template('urgot-single.html')
# [END app]
