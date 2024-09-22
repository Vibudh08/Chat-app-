import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { context } from "../../context/Context";

const Main = () => {

  const value = (id)=>{
    let paragraphText = document.getElementById(id).textContent;
    onSent(paragraphText)
  }
  const {onSent,recentPrompt,showResult,loading,resultData,input,setInput,setIsOpen} = useContext(context)
  return (
    <div className="main">
      <div className="nav">
        <img
          className="menu1"
          src={assets.menu_icon}
          alt=""
          onClick={() => setIsOpen((prev) => (prev === true ? false : true))}
        />
        <p>AI Chat</p>
        <img src={assets.vib} alt="" />
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className="result-title">
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.ai_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div onClick={() => value("aa")} className="card">
                <p id="aa">
                  Suggest beautiful places to see on an upcoming road trip
                </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div onClick={() => value("bb")} className="card">
                <p id="bb">Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div onClick={() => value("cc")} className="card" id="abc">
                <p id="cc">
                  Brainstorm team bonding activities for our work retreat
                </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div onClick={() => value("dd")} className="card" id="bcd">
                <p id="dd">Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="" />
            </div>
          </div>

          <p className="bottom-info">
            Don't trust Google AI with important information. Instead Google it.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Main;
