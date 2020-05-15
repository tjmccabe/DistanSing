import React from 'react';

export default class WelcomeCarousel extends React.Component {
  constructor(props) {
    super(props);
  }

// Add these to splash if you wan to use it  
//   let welcomeCarousel = document.querySelector('.welcome-carousel');
//   new Flickity(
//   welcomeCarousel,
//   {
//     draggable: false,
//     wrapAround: true,
//     autoPlay: 4000
//   }
// )

  // <div className="welcome-container">
  //   <WelcomeCarousel />
  // </div>

  render() {
    return (
      <div className="welcome-carousel">
        <div className="welcome-cell-main">
          <h1>
            Welcome To DistanSing, where we're all only 6 beats apart
          </h1>
          <p>When it comes to connecting with your favorite artists and other people, nothing should stop you. DistanSing was developed to ensure that even in dire circumstances, people can come together and share their love of music while also staying safe and healthy.</p>
        </div>
        <div className="welcome-cell-creators">
          <h1>
            Meet the creators
          </h1>
          <div className="creators-container">
            <div>
              <div>TJ McCabe</div>
              <img src="" alt=""/>
            </div>
            <div>
              <div>Darrick Yong</div>
              <img src="" alt=""/>
            </div>
            <div>
              <div>Danny Huang</div>
              <img src="" alt=""/>
            </div>
            <div>
              <div>Glen Park</div>
              <img src="" alt=""/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/* .welcome-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.welcome-carousel {
  width: 80%;
  height: 300px;
  margin: 30px 0;
}

.welcome-cell-main, .welcome-cell-creators {
  width: 100%;
  height: 100%;
}

.welcome-cell-main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.welcome-cell-creators {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.creators-container {
  display: flex;
  justify-content: space-evenly;
} */