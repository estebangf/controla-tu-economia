import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

export class Autocomplete extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    inputDetails: PropTypes.shape({}).isRequired,
    disconect: PropTypes.bool
  };

  static defaultProps = {
    value: "",
    disconect: false
  };

  renderInput(props) {
    const { InputProps, label, fullWidth} = props
    return (
      <TextField
        InputProps={InputProps}
        label={label}
        fullWidth={fullWidth}
      />
    )
  }

  getSuggestions = (items, inputValue, disconect) => {
    //if (disconect) {
    if (false) {
      return [];
    }
    return items.filter(suggestion => {
      const keep =
        !inputValue ||
        (suggestion.primary || "")
          .toLowerCase()
          .match(inputValue.toLowerCase()) ||
        (suggestion.secondary &&
          suggestion.secondary.toLowerCase().match(inputValue.toLowerCase()));

      return keep;
    });
  };

  renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem, inputDetails }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = !!selectedItem && (selectedItem.key || '').indexOf(suggestion.key) > -1;
    
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.data._id}
        selected={isHighlighted}
        style={!!inputDetails.avatar ?
          { fontWeight: isSelected ? 500 : 400, height: 50 }
          :
          { fontWeight: isSelected ? 500 : 400 }
        }
      >
        {inputDetails.avatar && (
          <Avatar>{suggestion.primary[0]}</Avatar>
        )}
        <ListItemText
          primary={suggestion.primary}
          secondary={suggestion.secondary}
        />
      </MenuItem>
    );
  }

  render() {
    const {
      onSelect,
      onChange,
      value,
      items,
      inputDetails,
      disconect
    } = this.props;
    return (
      <Downshift
        style={{ position: "relative" }}
        onChange={(selection, functions) => onSelect(selection, functions)}
        onStateChange={({ inputValue, selectedItem, type }) => {
          if (
            type === "__autocomplete_change_input__" ||
            type === "__autocomplete_click_item__"
          ) {
            onChange({target: {value: inputValue}} || "");
//            onChange(inputValue || "");
          } else if (
            type === "__autocomplete_keydown_enter__"
          ) {
            onChange({target: {value: selectedItem.primary}} || "");
          }
        }}
        itemToString={item => {
          return item ? item.primary : "";
        }}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          clearSelection
        }) => (
          <div>
            {this.renderInput({
              InputProps: getInputProps({
                placeholder: inputDetails.placeholder,
                name: inputDetails.name,
                id: inputDetails.id,
                value
              }),
              label: inputDetails.label,
              fullWidth: inputDetails.fullWidth,
              
            })}
            <div {...getMenuProps()}>
              {isOpen && (
                <Paper
                  style={{
                    position: "absolute",
                    zIndex: 1
                  }}
                >
                  {this.getSuggestions(items, inputValue, disconect).map((suggestion, index) =>
                    this.renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem,
                      inputDetails
                    }),
                  )}
                </Paper>
              )}
            </div>
          </div>
        )}
      </Downshift>
    );
  }
}

export default Autocomplete;


/*

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, InputBase } from '@material-ui/core';

const suggestions = [
  {key: "1", value: 'Comida' },
  {key: "2", value: 'Barro' },
  {key: "3", value: 'Helado' },
  {key: "4", value: 'Peine' },
  {key: "5", value: 'Pan' },
];
const styles = theme => ({
  root: {
    flexGrow: 1,
    minWidth: '100%'
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    minWidth: 'max-content',
    width: '100%',
    overflow: 'auto'
  },
});

class Autocomplete extends Component {

  renderInput(inputProps) {
    const { InputProps, classes, ref, typeInput, ...other } = inputProps;

    return (
      <TextField
        InputProps={{
          ...InputProps,
          inputRef: ref,
          classes: {
            root: other.error ? {} : classes.inputRoot,
            input: classes.inputInput,
          },
        }}
        inputProps={{
          ...InputProps
        }}
        {...other}
      />
    );
  }
  
  renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = !!selectedItem && (selectedItem.key || '').indexOf(suggestion.key) > -1;
    
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.key}getInputProps
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.value}
      </MenuItem>
    );
  }

  getSuggestions(value) {
    if(!!value){
      const inputValue = deburr(value.trim()).toLowerCase();
      const inputLength = inputValue.length;
      let count = 0;
      return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {      
            const keep = suggestion.value.toLowerCase().includes(inputValue);
            return keep;
          });
    } else {
      return suggestions
    }
  }
  
  render() {
    const { classes, stylesRoot, stylesInput, label,
      selected, fullWidth, typeInput, handleChange } = this.props;

    const selectedItem = function(){
      let itemSelected = suggestions.filter((item) => {
        return item.value == selected
      })[0]
      
      return itemSelected && {value: ''};
    }
    return (
      <div className={classes.root} style={stylesRoot}>
        <Downshift
          itemToString={item => (item ? item.value : '')}
          onChange={handleChange}
          value={selectedItem()}
          initialSelectedItem={selectedItem()}
          selectedItem={selectedItem()}>
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            selectedItem,
            clearSelection
          }) => {
            return (
              <div className={classes.container}>
                {this.renderInput({
                  typeInput,
                  classes,
                  label: label,
                  fullWidth,
                  InputProps: getInputProps({
                    onChange: e => {
                      if (e.target.value === '') {
                        clearSelection()
                      }
                    },
                    style:stylesInput,
                  }),
                })}
                <div {...getMenuProps()}>
                  {isOpen ? (
                    <Paper className={classes.paper} square>
                      {this.getSuggestions(inputValue).map((suggestion, index) =>
                        this.renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion }),
                          highlightedIndex,
                          selectedItem,
                        }),
                      )}
                    </Paper>
                  ) : null}
                </div>
              </div>
              )
            }
          }
        </Downshift>
      </div>
    );
  }
}

export default withStyles(styles)(Autocomplete);
*/