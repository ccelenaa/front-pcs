import React, { CSSProperties } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
const mystyle = {
    background: "#222222",
    display: "flex",
}
export default function Footer(){
   
    return(
        <div class="footer-container">
           <div className="footer-content">
                <div style={{flexGrow: 1}}>
                    Conditionne générales<br/>
                </div>
                <div style={{flexGrow: 1}}>
                    Reglements<br/>
                </div>
                <div style={{flexGrow: 1}}>
                    Web maste<br/>
                </div>
                <div>
                    Copyright ESGI 2024<br/>
                </div>
            </div>
        </div>
    )
}