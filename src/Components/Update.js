import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  Slider,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Add from "@mui/icons-material/Add";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { State, City } from "country-state-city";

function AddEmployee() {
  const location = useLocation();
  console.log(location.state);
  const [value, setValue] = useState(location.state.state.dob);
  const [name, setName] = useState(location.state.state.name);
  const [email, setEmail] = useState(location.state.state.email);
  const [number, setNumber] = useState(location.state.state.number);
  const [address, setAddress] = useState(location.state.state.address);
  const [state, setState] = useState(location.state.state.state);
  const [city, setCity] = useState(location.state.state.city);
  const [citys, setCitys] = useState([]);
  const [gender, setGender] = useState(location.state.state.gender);
  const [pass, setPass] = useState(location.state.state.password);
  const [hobby, setHobby] = useState(location.state.state.hobbies);
  const [rate, setRate] = useState(location.state.state.rate);
  const [flag, setFlag] = useState(false);
  let history = useHistory();

  useEffect(() => {
    let stateCode;
    State.getStatesOfCountry("IN").map((d) =>
      d.name === state ? (stateCode = d.isoCode) : ""
    );
    setCitys(City.getCitiesOfState("IN", stateCode));
  }, [state]);

  const finalAdd = () => {
    let obj = {
      name: name,
      email: email,
      number: number,
      address: address,
      state: state,
      city: city,
      dob: value,
      gender: gender,
      password: pass,
      hobbies: hobby,
      rate: rate,
    };
    let emp = JSON.parse(localStorage.getItem("employee"));
    if (
      number.length == 10 &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      name !== ""
    ) {
      //    emp.map((d,i)=>d.name===name && d.number===number && d.email===email?d=JSON.stringify(obj):d)
      for (let i = 0; i < emp.length; i++) {
        if (location.state.state.id === emp[i].id) {
          emp[i].name = name;
          emp[i].email = email;
          emp[i].number = number;
          emp[i].address = address;
          emp[i].state = state;
          emp[i].city = city;
          emp[i].dob = value;
          emp[i].gender = gender;
          emp[i].password = pass;
          emp[i].hobbies = hobby;
          emp[i].rate = rate;
        }
      }

      localStorage.setItem("employee", JSON.stringify(emp));
      history.push("/Employee");
    }
    console.log(JSON.parse(localStorage.getItem("employee")));
  };
  function hoobis(e, h) {
    let f = false;
    hobby.map((hb) => (hb === h ? (f = true) : hb));
    if (e.target.checked && !f) {
      setHobby([...hobby, h]);
    } else {
      let pos = 0;
      let temp = hobby;
      temp.map((hb, i) => (hb === h ? (pos = i) : pos));

      temp.splice(pos, 1);
      setHobby(JSON.parse(JSON.stringify(temp)));
    }
  }
  useEffect(() => {
    console.log(hobby);
  }, [hobby]);

  return (
    <div>
      <center>
        <Box style={{ width: 1100 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>Update Employee</h2>
            </Grid>
            <Grid item xs={3} md={6}>
              <TextField
                fullWidth
                error={name == "" && flag ? true : false}
                id={
                  name === "" ? "outlined-error-helper-text" : "outlined-basic"
                }
                label="Name"
                variant="outlined"
                value={name}
                helperText={name === "" ? "Required Field" : ""}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id={
                  email === "" ? "outlined-error-helper-text" : "outlined-basic"
                }
                error={
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    email
                  ) === false && flag
                    ? true
                    : false
                }
                label="Email"
                variant="outlined"
                value={email}
                helperText={
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    email
                  ) === false
                    ? "Enter Valid Mail or Fill the Mail"
                    : ""
                }
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id={
                  number.length < 10
                    ? "filled-error-helper-text"
                    : "filled-number"
                }
                error={number.length < 10 ? true : false}
                value={number}
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  number.length < 10 || number.length === undefined
                    ? setNumber(e.target.value)
                    : 0
                }
                helperText={number.length < 10 ? "Enter Valid Mobile No." : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={State.getStatesOfCountry("IN").map((d) => d.name)}
                defaultValue={state}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="states" />
                )}
                onSelect={(e) => setState(e.target.value)}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              {" "}
              <TextareaAutosize
                aria-label="minimum height"
                style={{ width: "100%" }}
                minRows={5}
                value={address}
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                style={{ width: "100%" }}
                id="combo-box-demo"
                options={citys.map((d) => d.name)}
                value={city}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="city" />}
                onSelect={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="outlined-password-input"
                fullWidth
                label="Password"
                type="password"
                value={pass}
                autoComplete="current-password"
                onChange={(e) => setPass(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ width: 300 }}>
                Rate Your Communication Skills:
                <Slider
                  aria-label="Skills"
                  defaultValue={rate}
                  // getAriaValueText={"skills"}
                  valueLabelDisplay="auto"
                  step={1}
                  min={1}
                  max={5}
                  onChange={(e) => setRate(e.target.value)}
                />
              </Box>
            </Grid>

            <Grid item xs={6}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onClick={(e) => setGender(e.target.value)}
                  defaultValue={gender}
                >
                  {/* setGender(e.targetvalue) */}
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <span style={{ color: "#666" }}> Hobbies:</span>
              <Checkbox
                onClick={(e) => hoobis(e, "Cricket")}
                checked={hobby.includes("Cricket")}
                sx={{
                  color: "green",
                  "&.Mui-checked": {
                    color: "green",
                  },
                }}
              />{" "}
              Cricket{" "}
              <Checkbox
                onClick={(e) => hoobis(e, "Football")}
                checked={hobby.includes("Football")}
                sx={{
                  color: "blue",
                  "&.Mui-checked": {
                    color: "blue",
                  },
                }}
              />
              Football{" "}
              <Checkbox
                onClick={(e) => hoobis(e, "Chess")}
                checked={hobby.includes("Chess")}
                sx={{
                  color: "purple",
                  "&.Mui-checked": {
                    color: "purple",
                  },
                }}
              />
              Chess{" "}
              <Checkbox
                onClick={(e) => hoobis(e, "Reading Books")}
                checked={hobby.includes("Reading Books")}
                sx={{
                  color: "red",
                  "&.Mui-checked": {
                    color: "red",
                  },
                }}
              />
              Reading Books
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => {
                  setFlag(true);
                  finalAdd();
                }}
              >
                Update
              </Button>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <Button
                variant="contained"
                onClick={() => history.push("/Employee")}
                color="error"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </center>
    </div>
  );
}

export default AddEmployee;
