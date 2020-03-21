import React from "react";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AutocompleteComponent = ({ selecthandler }) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const inputRef = React.createRef();

  const handleChange = async event => {
    event.persist();
    if (!event || !event.target || !event.target.value) {
      return;
    }

    setInputValue(event.target.value);
    const response = await fetch(
      "https://places-dsn.algolia.net/1/places/query",
      {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: `{"query": "${inputValue}", "type": "city", "language" :"en"}`
      }
    );
    const result = await response.json();
    if (!result.hits || !Array.isArray(result.hits)) return;
    const centers = result.hits.map(
      ({ locale_names, administrative, _geoloc }) => {
        const name = locale_names[0];
        const state = administrative[1];
        return { name, state, _geoloc };
      }
    );

    if (centers.length > -1) {
      setOptions(centers);
      setOptions(centers);
    }
  };

  React.useEffect(() => {
    const currentInputValue = document.getElementsByClassName(
      "MuiInputBase-input MuiOutlinedInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"
    )[0].value;

    const place = options.filter(center => center.name === currentInputValue);
    selecthandler(place[0] || undefined);
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      style={{ backgroundColor: "white", width: "100%" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => {
        console.log(option, value, "getOptionSelected");

        return option.name === value.name;
      }}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          ref={inputRef}
          label="Search your nearest corona center"
          variant="outlined"
          fullWidth={true}
          onChange={handleChange.bind(this)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};

export default AutocompleteComponent;
