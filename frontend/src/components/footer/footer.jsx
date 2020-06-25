import React from 'react';
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  const us = { 
    "TJ McCabe": { 
      github: "https://github.com/tjmccabe",
      linkedin: "https://www.linkedin.com/in/tj-mccabe/",
      pic: "https://distansing-dev.s3-us-west-1.amazonaws.com/tj.png"
    },
    "Darrick Yong": {
      github: "https://github.com/darrickyong",
      linkedin: "https://www.linkedin.com/in/darrickyong/",
      pic: "https://distansing-dev.s3-us-west-1.amazonaws.com/darrick.jpg"
    },
    "Danny Huang": {
      github: "https://github.com/DannyRH27",
      linkedin: "https://www.linkedin.com/in/dannyrhuang/",
      pic: "https://distansing-dev.s3-us-west-1.amazonaws.com/danny.jpeg"
    }, 
    "Glen Park": {
      github: "https://github.com/glenpark00",
      linkedin: "https://www.linkedin.com/in/glen-park/",
      pic: "https://distansing-dev.s3-us-west-1.amazonaws.com/glen.jpeg"
    }
  }
  return (
    <div className="footer" id="footer">
        <div className="footer-site-info-left">
          <div className="footer-info-logo">DistanSing</div>
          {Object.keys(us).map((engineer, idx) => (
            <div key={idx} className="footer-item-container">
              <img
                className="foot-pic"
                src={us[engineer].pic}
                alt=""
              />
              <div className="footer-item-content">
                <div>{engineer}</div>
                <div className="footer-icons">
                  <a href={us[engineer].github} target="_blank">
                    <FaGithub className="footer-git-logo"/>
                  </a>
                  <a href={us[engineer].linkedin} target="_blank">
                    <FaLinkedin className="footer-li-logo"/>
                  </a>
                </div>
              </div>
            </div>
          ))}
        <div className="footer-info-copyright">
          &#169; Kunsole Lawg Studios 2020
        </div>
      </div>
    </div>
  );
}

export default Footer;