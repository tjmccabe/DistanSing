import React from 'react';

const Footer = () => {
  const us = ["TJ McCabe", "Darrick Yong", "Danny Huang", "Glen Park"]
  return (
    <div className="footer">
      {/* <div className="footer-border">
        <div className="footer-line"></div>
        <div className="footer-distansing">DistanSing Logo here</div>
        <div className="footer-line"></div>
      </div> */}
      <div className="footer-about">
        {us.map(engineer => 
          <div className="footer-item-container">
            <img className="foot-pic" src="https://distansing-dev.s3-us-west-1.amazonaws.com/tj.png" alt="" />
            <div className="footer-item-content">
              <div>{engineer}</div>
              <div className="footer-icons">
                <img className="footer-git-logo" src="https://distansing-dev.s3-us-west-1.amazonaws.com/git_og.png" alt="" />
                <img className="footer-li-logo" src="https://distansing-dev.s3-us-west-1.amazonaws.com/linked_in_icon.png" alt="" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Footer;