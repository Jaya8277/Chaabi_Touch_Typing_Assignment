import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const plainText = [
  "aada aa aa aa",
  "sds sklj;s ss ss",
  "dd dd dd dd",
  "ll ll ll ll",
  "asdf l;l;",
  "ls dj al dl",
  "as as as as",
  "dss dss dss fdss",
  "df df df df",
  "ff f;f jfjf ff",
  "gg gg gg gg",
  "asdj ;lgf",
  "sdja hl;g",
  "djsa lg;h",
  "hh hsdah hh hh",
  "jj jj jj jj",
  "kkkk gghkk kk",
  "gh gh gh gh",
  "jk jk jk jk",
  "l; l; l; l;",
  "sa df gj lk",
  "dj aasdfl sk ;l",
  "as df gj kl",
  "sd jg la ;k",
  "djsa fghl",
  "sadj hgfl",
  "jdassdl;gh",
  "adsjjhj ;flg",
  "sjaddssglh;",
  "js;lhg",
  "das das das das",
  "jala alala lalala",
  
];
const Compare = () => {
  const presentText = useSelector((store) => store.AppReducer.presentText);

  const [inputtypes, setInputtypes] = useState("");
  const [presenttchar, setPresenttchar] = useState(presentText[0]);
  const [runt, setRunt] = useState(null);
  const [all, setAll] = useState(1);
  const [gltchars, setGltchars] = useState(0);
  const [curc, setCurc] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [times, setTimes] = useState(null);
  const [allchar, setAllchar] = useState(0);
  const [gltchar, setGltchar] = useState(0);
  const [level, setLevel] = useState("plainText");

  const dispatch = useDispatch();

  if (seconds % 300 === 0 && seconds !== 0 && times) {
    clearInterval(times);
    setSeconds(0);
    console.log("ll");
    const match = (Date.now() - runt) / 1000;
    const WPM = Math.round(allchar / 5 / (match / 60));
    const NumWPM = Math.round(
      (allchar - gltchar) / 5 / (match / 60)
    );
    const accuracy = Math.floor((NumWPM * 100) / WPM);
    dispatch({ type: "5MIN", payload: { allchar, WPM } });
  }

  function runtr() {
    setAllchar(0);
    setGltchar(0);
    let id = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    setTimes(id);
  }

  const handleTextChange = () => {
    if (level === "plainText") {
      const randomValue = Math.floor(Math.random() * plainText.length);

      setPresenttchar(plainText[randomValue][0]);

      dispatch({ type: "CHANGE", payload: plainText[randomValue] });
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setInputtypes(value);
    if (seconds === 0 && !times) {
      let id = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      setTimes(id);
    }

    let test = "";
    for (let i = 0; i < value.length; i++) {
      test = test + presentText[i];
      if (value[i] === presentText[i] && curc[i] === undefined) {
        curc[i] = true;
        setCurc({ ...curc });
      } else if (curc[i] === undefined) {
        curc[i] = false;
        setCurc({ ...curc });
      }
    }

     if (value.length > inputtypes.length) {
      setAll((pre) => pre + 1);
      setAllchar(allchar + 1);
    }

    //  word per min
    if (!runt) {
      setRunt(Date.now());
    }

    if (test !== value) {
      setGltchars(gltchars + 1);
      setGltchar(gltchar + 1);
    } else {
      if (value[value.length - 1] === presentText[value.length - 1]) {
        setPresenttchar(presentText[value.length]);
      }
    }

    if (test === value && value.length === presentText.length) {
      const match = (Date.now() - runt) / 1000;
      const WPM = Math.round(all / 5 / (match / 60));
      const NumWPM = Math.round((all - gltchars) / 5 / (match / 60));

      const accuracy = Math.floor((NumWPM * 100) / WPM);

      setInputtypes("");
      setRunt(null);
      setAll(1);
      setCurc({});
      setGltchars(0);
      dispatch({ type: "SHOW", payload: { wpm: WPM, accuracy: accuracy } });
      handleTextChange();
    }
  };

  useEffect(() => {
    handleTextChange();
  }, []);

  const minutes = Math.floor(seconds / 60);
  const formattedSeconds = seconds % 60;

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        gap={"20px"}
        marginTop={"20px"}
        marginBottom={"30px"}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ fontSize: "30px" }}>Enter Key -</Typography>
          <Button
            variant="outlined"
            
            sx={{
              width: 120,
              color: "white",
               marginLeft: "20px",
              backgroundColor: "teal",
              fontSize:'25px',
              height:50
            }}
          >
            {presenttchar === " " ? "Space" : presenttchar}
          </Button>
        </Box>
        <Box
          sx={{
            fontSize: "20px",
          }}
        >
          Minutes: {minutes} Seconds: {formattedSeconds}
          {seconds === 0 && (
            <Button
              variant="outlined"
              sx={{
                marginLeft: "10px",
                color: "white",
                backgroundColor: "teal",
              }}
              onClick={runtr}
            >
              Start
            </Button>
          )}
        </Box>
      </Box>
      <TextField
        placeholder="Start Typing........"
        sx={{
          width: { sm: 200, md: 700 },
          marginTop: "20px",
          "& .MuiInputBase-root": {
            height: 80,
            borderRadius: "10px",

            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          },
        }}
        inputProps={{ style: { fontSize: 30 } }}
        value={inputtypes}
        onChange={handleInput}
      />
    </div>
  );
};

export default Compare;
