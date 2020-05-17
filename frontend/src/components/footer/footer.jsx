import React from 'react';

const Footer = () => {
  const us = ["TJ McCabe", "Darrick Yong", "Danny Huang", "Glen Park"]
  return (
    <div className="footer">
      <div className="footer-about">
        {us.map((engineer, idx) => 
          <div key={idx} className="footer-item-container">
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
      <div className="footer-site-info">
        <div className="footer-site-info-left">
          <div className="footer-info-logo">DistanSing</div>
          <div className="footer-info-text">By using this site, you agree to our Terms of Service (the only term being please do not hack us!)</div>
        </div>
        <div className="footer-info-copyright">&#169; Kunsole Lawg Studios 2020</div>
      </div>
    </div>
  )
}

export default Footer;