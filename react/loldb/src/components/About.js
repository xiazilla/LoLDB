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
                                <li>insert here</li>
                                
                            <h4>Number of Commits: 11</h4>
                            <h4>Number of Issues: 5</h4>
                            <h4>Number of Unit Tests: 0</h4>
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
                                <li>insert here</li>

                            <h4>Number of Commits: 11</h4>
                            <h4>Number of Issues: 5</h4>
                            <h4>Number of Unit Tests: 0</h4>
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
                                <li>insert here</li>
                            <h4>Number of Commits: 11</h4>
                            <h4>Number of Issues: 5</h4>
                            <h4>Number of Unit Tests: 0</h4>
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
                                <li>insert here</li>
                            <h4>Number of Commits: 11</h4>
                            <h4>Number of Issues: 5</h4>
                            <h4>Number of Unit Tests: 0</h4>
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
                                <li>insert here</li>
                            <h4>Number of Commits: 11</h4>
                            <h4>Number of Issues: 5</h4>
                            <h4>Number of Unit Tests: 0</h4>
                        </div>
                    </div>
                </div>
            
    
            </div>
            </div>
	        
        )
    }
}

export default About;
