import React, { Component } from 'react';
import profile1 from "../images/wesley_headshot.jpg"
import profile2 from "../images/viet_headshot.jpg"
import profile3 from "../images/hiep_headshot.jpg"
import profile4 from "../images/jamie_headshot.jpg"
import profile5 from "../images/anjiya_headshot.png"

 
class About extends Component {
    render() {
        return (
        	
            <div>

            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="block">
                            <h1>SWE of Legends</h1>
                        </div>
                    </div>
                </div>
            </div>

	         <h2 align="left">Motivation</h2>
          			<p>
            			LoLDB was created for summoners to look up information 
            			about champions, items, game modes, and recent matches 
            			of players in the Challenger tier.
                    </p>
                <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>The Team</h1>
                    </div>
                    <div className="col-md-4">
                        <div>
                            <div>
                                <img src={profile1} alt="" width="325" height="325"/>
                            </div>
                            <h3>Wesley Chung</h3>
                            <p> Senior Computer Science student attending the University of Texas at Austin. Enjoys 
                            video games, music, racquetball, and being a better LoL player than Viet Tran.</p>
                            <h4>Responsibilities:</h4>
                                <p>Backend</p>
                                
                            <h5>Number of Commits: 30</h5>
                            <h5>Number of Issues: 9</h5>
                            <h5>Number of Unit Tests: 3</h5>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div>
                            <div>
                                <img src={profile2} alt="" width="325" height="325"/>
                            </div>
                            <h3>Viet Tran</h3>
                            <p> Senior at the University of Texas at Austin, majoring in Computer Science. Enjoys playing video games
                            in his free time. He is also the best League player on this team.</p>
                            <h4>Responsibilities:</h4>
                                <p>Frontend and Backend</p>

                            <h5>Number of Commits: 39</h5>
                            <h5>Number of Issues: 9</h5>
                            <h5>Number of Unit Tests: 0</h5>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div>
                            <div>
                                <img src={profile3} alt="" width="325" height="325"/>
                            </div>
                            <h3>Hiep Vu</h3>
                            <p> Senior in Computer Science who enjoys playing mobile games and listening to music. 
                            Doesn't actually play League.</p>
                            <h4>Responsibilities:</h4>
                                <p>Backend</p>
                            <h5>Number of Commits: 26</h5>
                            <h5>Number of Issues: 5</h5>
                            <h5>Number of Unit Tests: 8</h5>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div>
                            <div>
                                <img src={profile4} alt="" width="325" height="325"/>
                            </div>
                            <h3>Jamie Xia</h3>
                            <p> Senior in Computer Science. Allergic to weakness. And Bronzies.</p>
                            <h4>Responsibilities:</h4>
                                <p>Frontend</p>
                            <h5>Number of Commits: 51</h5>
                            <h5>Number of Issues: 5</h5>
                            <h5>Number of Unit Tests: 0</h5>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div>
                            <div>
                                <img src={profile5} alt="" width="325" height="325"/>
                            </div>
                            <h3>Anjiya Nayani</h3>
                            <p> Senior studying Computer Science who is soon to be addicted to
                            League of Legends because of this project.</p>
                            <h4>Responsibilities:</h4>
                                <p>Frontend</p>
                            <h5>Number of Commits: 32</h5>
                            <h5>Number of Issues: 5</h5>
                            <h5>Number of Unit Tests: 0</h5>
                        </div>
                    </div>
                </div>
            <div id="call-to-action">
            <div class="container">
                <div class="row-md-12">
                    <div class="col-md-12">
                        <div class="block">
                            <h2 class="title wow fadeInDown" data-wow-delay=".3s" data-wow-duration="500ms">TOOLS </h2>
                            <h5> <b>Apiary:</b> A useful web app that provides framework to easily document your endpoint’s API calls. </h5>
                            <h5> <b>Bootstrap:</b> A front-end development framework made up of HTML, CSS, and Javascript that allows the build of fully responsive websites. </h5>
                            <h5> <b>Flask:</b> A Python framework used to create our back-end API </h5>
                            <h5> <b>Github:</b> Our source control application of choice. </h5>
                            <h5> <b>Google Cloud Platform:</b> To host our static website on the Google Cloud Storage. </h5>
                            <h5> <b>MongoDB:</b> A free and open-source cross-platform document-oriented database program. </h5>
                            <h5> <b>PlanIT Poker:</b> To estimate the time of tasks as a team. </h5>
                            <h5> <b>React:</b> A Javascript library to build user interfaces for websites. </h5>
                            <h5> <b>Slack:</b> For team communication. </h5>
                            <h5> <b>Trello:</b> For issue tracking. </h5>

                            <h2 class="title wow fadeInDown" data-wow-delay=".3s" data-wow-duration="500ms">DATA </h2>
                            <h5><a href="https://developer.riotgames.com/">Riot Games API:</a> the best place for any GET requests about League of Legends information.</h5>
                            <h5><a href="http://leagueoflegends.wikia.com/api/v1">League of Legends Fandom Wiki API:</a> the only other place for any GET requests about League of Legends.</h5>


                            <h2 class="title wow fadeInDown" data-wow-delay=".3s" data-wow-duration="500ms">STATS </h2>
                            <h4> total no. of commits: 176</h4>
                            <h4>total no. of issues: 33</h4>
                            <a href="https://github.com/xiazilla/idb" class="btn btn-default btn-contact wow fadeInDown" data-wow-delay=".7s" data-wow-duration="500ms">Github Repo  </a>

                            <a href="http://docs.xiazilla.apiary.io/#" class="btn btn-default btn-contact wow fadeInDown" data-wow-delay=".7s" data-wow-duration="500ms">Apiary API  </a>

                            <a href="https://trello.com/b/XNiqgNfd/static-webpage" class="btn btn-default btn-contact wow fadeInDown" data-wow-delay=".7s" data-wow-duration="500ms">Trello  </a>

                            <a href="https://utexas.box.com/s/tn6eq1ub4py0zc6mfgnezvhw7u1mgse8" class="btn btn-default btn-contact wow fadeInDown" data-wow-delay=".7s" data-wow-duration="500ms">Technical Report  </a>

                            <a href="https://utexas.box.com/s/7fje911p5y2l2nkof5zdmpqaa0t5r061" class="btn btn-default btn-contact wow fadeInDown" data-wow-delay=".7s" data-wow-duration="500ms">UML</a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    
            </div>
            </div>
	        
        )
    }
}

export default About;
