import React, { Component } from 'react';
import profile1 from '../images/wesley_headshot.jpg';
import profile2 from '../images/viet_headshot.jpg';
import profile3 from '../images/hiep_headshot.jpg';
import profile4 from '../images/jamie_headshot.jpg';
import profile5 from '../images/anjiya_headshot.png';

class About extends Component {
  render () {
    return (

      <div>
        <div className='global-about'>
          <div class='container'>
            <div class='row'>
              <div class='col-md-12'>
                <div class='block'>
                  <h1>SWE of Legends</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <h2 align='left'>Motivation</h2>
        <p>
            LoLDB was created for summoners to look up information
            about champions, items, game modes, and recent matches
            of players in the Challenger tier.
        </p>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1>The Team</h1>
            </div>
            <div className='col-md-4'>
              <div>
                <div>
                  <img src={profile1} alt='' width='325' height='325' />
                </div>
                <h3>Wesley Chung</h3>
                <p> Senior Computer Science student attending the University of Texas at Austin. Enjoys
                            video games, music, racquetball, and being a better LoL player than Viet Tran.</p>
                <h4>Responsibilities:</h4>
                <p>Backend</p>

                <h5>Number of Commits: 30</h5>
                <h5>Number of Issues: 9</h5>
                <h5>Number of Unit Tests: 3</h5>
                <br />
              </div>
            </div>
            <div className='col-md-4'>
              <div>
                <div>
                  <img src={profile2} alt='' width='325' height='325' />
                </div>
                <h3>Viet Tran</h3>
                <p> Senior at the University of Texas at Austin, majoring in Computer Science. Enjoys playing video games
                            in his free time. He is also the best League player on this team.</p>
                <h4>Responsibilities:</h4>
                <p>Frontend and Backend</p>

                <h5>Number of Commits: 39</h5>
                <h5>Number of Issues: 9</h5>
                <h5>Number of Unit Tests: 0</h5>
                <br />
              </div>
            </div>
            <div className='col-md-4'>
              <div>
                <div>
                  <img src={profile3} alt='' width='325' height='325' />
                </div>
                <h3>Hiep Vu</h3>
                <p> Senior in Computer Science who enjoys playing mobile games and listening to music.
                            Doesn't actually play League.</p> <br />
                <h4>Responsibilities:</h4>
                <p>Backend</p>
                <h5>Number of Commits: 26</h5>
                <h5>Number of Issues: 5</h5>
                <h5>Number of Unit Tests: 8</h5>
                <br />
              </div>
            </div>
            <div className='col-md-4'>
              <div>
                <div>
                  <img src={profile4} alt='' width='325' height='325' />
                </div>
                <h3>Jamie Xia</h3>
                <p> Senior in Computer Science. Allergic to weakness. And Bronzies.</p> <br />
                <h4>Responsibilities:</h4>
                <p>Frontend</p>
                <h5>Number of Commits: 51</h5>
                <h5>Number of Issues: 5</h5>
                <h5>Number of Unit Tests: 0</h5>
                <br />
              </div>
            </div>
            <div className='col-md-4'>
              <div>
                <div>
                  <img src={profile5} alt='' width='325' height='325' />
                </div>
                <h3>Anjiya Nayani</h3>
                <p> Senior studying Computer Science who is soon to be addicted to
                            League of Legends because of this project.</p>
                <h4>Responsibilities:</h4>
                <p>Frontend</p>
                <h5>Number of Commits: 32</h5>
                <h5>Number of Issues: 5</h5>
                <h5>Number of Unit Tests: 0</h5>
                <br />
              </div>
            </div>
          </div>

          <div id='call-to-action'>
            <div class='global-about'>
              <div class='row-md-12'>
                <div class='col-md-12'>
                  <div class='block'>
                    <h2 class='title'> <b>TOOLS</b> </h2>
                    <p> <b>Apiary:</b> A useful web app that provides framework to easily document your endpoint’s API calls. </p>
                    <p> <b>Bootstrap:</b> A front-end development framework made up of HTML, CSS, and Javascript that allows the build of fully responsive websites. </p>
                    <p> <b>Flask:</b> A Python framework used to create our back-end API </p>
                    <p> <b>Github:</b> Our source control application of choice. </p>
                    <p> <b>Google Cloud Platform:</b> To host our static website on the Google Cloud Storage. </p>
                    <p> <b>MongoDB:</b> A free and open-source cross-platform document-oriented database program. </p>
                    <p> <b>PlanIT Poker:</b> To estimate the time of tasks as a team. </p>
                    <p> <b>React:</b> A Javascript library to build user interfaces for websites. </p>
                    <p> <b>Slack:</b> For team communication. </p>
                    <p> <b>Trello:</b> For issue tracking. </p>
                    <br />

                    <h2 class='title'> <b>DATA</b> </h2>
                    <p><a href='https://developer.riotgames.com/'>Riot Games API:</a> the best place for any GET requests about League of Legends information.</p>
                    <p><a href='http://leagueoflegends.wikia.com/api/v1'>League of Legends Fandom Wiki API:</a> the only other place for any GET requests about League of Legends.</p>
                    <br />

                    <h2 class='title'> <b>STATS</b> </h2>
                    <h5>total no. of commits: 176</h5>
                    <h5>total no. of issues: 33</h5>
                    <h5>total no. of unit tests: </h5>
                    <br />
                    <a href='https://github.com/xiazilla/idb'><button className='btn'>Github Repo</button></a> &nbsp;
                    <a href='http://docs.xiazilla.apiary.io/#'><button className='btn'>Apiary API</button></a> &nbsp;
                    <a href='https://trello.com/b/XNiqgNfd/static-webpage'><button className='btn'>Trello</button></a> &nbsp;
                    <a href='https://utexas.box.com/s/tn6eq1ub4py0zc6mfgnezvhw7u1mgse8'><button className='btn'>Tech Report</button></a> &nbsp;
                    <a href='https://utexas.box.com/s/7fje911p5y2l2nkof5zdmpqaa0t5r061'><button className='btn'>UML</button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }
}

export default About;
