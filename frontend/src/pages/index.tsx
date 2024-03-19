import React from "react";
import Upload from "../components/Upload";
import Chat from "../components/Chat";
const Home: React.FC = () =>{
  return(  
      <div className="App">
        <aside className="side_menu">
          <Upload/>
        </aside>
        <section className="chat_box" id="#chat">
          <Chat/>
        </section>     
      
      </div>
  )
}

export default Home;