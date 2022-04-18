import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Slider,
  TextareaAutosize,
  TextField,
  Grid,
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
import { State, City } from "country-state-city";

function AddEmployee() {
  const [value, setValue] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(0);
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [pass, setPass] = useState("");
  const [hobby, setHobby] = useState([]);
  const [rate, setRate] = useState(0);
  const [flag, setFlag] = useState(false);
  const [citys, setCitys] = useState([]);
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
      id: 1,
    };

    let emp = JSON.parse(localStorage.getItem("employee"));
    if (
      emp === null &&
      number.length === 10 &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      name !== ""
    ) {
      localStorage.setItem("employee", JSON.stringify([obj]));
      history.push("/Employee");
    } else {
      if (
        number.length == 10 &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
        name !== ""
      ) {
        obj.id = emp.length + 1;
        localStorage.setItem("employee", JSON.stringify([...emp, obj]));
        history.push("/Employee");
      }
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
              <h2>Add Employee</h2>
            </Grid>
            <Grid item xs={3} md={6}>
              <TextField
                fullWidth="true"
                error={name == "" && flag ? true : false}
                id={
                  name === "" ? "outlined-error-helper-text" : "outlined-basic"
                }
                label="Name"
                variant="outlined"
                helperText={name === "" ? "Required Field" : ""}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth="true"
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
                fullWidth="true"
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
                id="combo-box-demo"
                options={State.getStatesOfCountry("IN").map((d) => d.name)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="states" />
                )}
                onSelect={(e) => {
                  setState(e.target.value);
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={4}
                placeholder="Address"
                style={{ width: "100%" }}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                id="combo-box-demo"
                options={citys.map((d) => d.name)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="city" />}
                onSelect={(e) => setCity(e.target.value)}
                style={{ width: "100%" }}
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
                  renderInput={(params) => (
                    <TextField {...params} fullWidth="true" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPass(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ width: 300 }}>
                Rate Your Communication Skills:
                <Slider
                  aria-label="Skills"
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
                >
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
                sx={{
                  color: "purple",
                  "&.Mui-checked": {
                    color: "purple",
                  },
                }}
              />
              Chess{" "}
              <Checkbox
                sx={{
                  color: "red",
                  "&.Mui-checked": {
                    color: "red",
                  },
                }}
                onClick={(e) => hoobis(e, "Reading Books")}
              />
              Reading Books
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => {
                  setFlag(true);
                  finalAdd();
                }}
              >
                Add Employee
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
