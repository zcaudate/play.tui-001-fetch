import React from 'react'

import nodeUtil from 'util'

import nodeFetch from 'node-fetch'

import blessed from 'blessed'

import reactBlessed from 'react-blessed'

// play.tui-001-fetch.main/Button [17] 
function Button({action,color,disabled,left,text,top}){
  return (
    <button
      left={left || 0}
      top={top || 0}
      content={text}
      shrink={true}
      mouse={true}
      onPress={function (){
        if(action && !disabled){
          action();
        }
      }}
      padding={{"top":1,"right":2,"bottom":1,"left":2}}
      style={{
        "bg":!disabled ? color : "black",
        "fg":!disabled ? "white" : "gray",
        "focus":{"bold":true}
      }}>
    </button>);
}

// play.tui-001-fetch.main/Fetch [37] 
function Fetch(){
  let [val,setVal] = React.useState({});
  return (
    <box>
      <box
        keys={true}
        mouse={true}
        width={80}
        height={20}
        border="line"
        scrollable={true}
        scrollbar={{"style":{"bg":"gray","fg":"gray"},"track":true}}
        content={nodeUtil.inspect(val,{"colors":true,"depth":0})}>
      </box>
      <Button
        top={21}
        left={2}
        action={function (){
          fetch(
            "https://api.github.com/users/zcaudate",
            {"headers":{"Accept":"application/vnd.github.v3+json"}}
          ).then(function (res){
            return res.json();
          }).then(function (res){
            setVal(res);
          });
        }}
        color="gray"
        text="GITHUB">
      </Button>
    </box>);
}

// play.tui-001-fetch.main/App [60] 
function App(){
  return (
    <box
      label="Tui 001 - Fetch"
      border="line"
      style={{"border":{"fg":"green"}}}>
      <box left={5}>
        <box top={3}><text top={-1} left={1}>RESULT</text><Fetch></Fetch></box>
      </box>
    </box>);
}

// play.tui-001-fetch.main/Screen [71] 
function Screen(){
  let screen = blessed.screen(
    {"autoPadding":true,"smartCSR":true,"title":"Tui Fetch Basic"}
  );
  screen.key(["q","C-c","Esc"],function (){
    this.destroy();
  });
  return screen;
}

// play.tui-001-fetch.main/__init__ [82] 
// 5376c3c7-039f-420c-9608-29706f03927c
globalThis["fetch"] = nodeFetch;
reactBlessed.render((
  <App></App>),Screen());