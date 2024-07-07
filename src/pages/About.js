import React, { Component } from "react";
import "./About.css";
import profile_pic from "../assets/profile_pic.jpeg";

export default class About extends Component {
  render() {
    return (
      <div>
        {/* <p>Design your About me page </p> */}
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={profile_pic}
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Karina Chung</div>
            <div className="brief_description">
            Karina is a rising junior at Harvard College 
            studying Applied Mathematics. Her academic interests include
            computer science, data science, climate and environment, and economics. 
            Over the last five years, she has worked on programming and data science 
            projects spanning academic research, finance, and tech.  
            In her spare time, she enjoys bouldering, listening to classical and pop music, 
            and watching MLB baseball.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
