import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './Weather';

const API_KEY = "908e1e83b536c6baafacb6c77fbb6d82";

export default class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  };
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position => {
        this.getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: error
        })
      }
    );
  }
  getWeather = (lat, lon) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          name: json.weather[0].main,
          isLoaded: true
        })
      })
  }
  render() {
    const { isLoaded, error, temperature } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <Weather temp={Math.floor(temperature - 273.15)}/>
        ): (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the weather data</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null }
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    backgroundColor: "#FDF6AA",
    justifyContent: "flex-end",
    paddingLeft: 25,
    paddingRight: 10

  },
  errorText: {
    color: "red",
    backgroundColor: "transparent",
    marginBottom: 40
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 24
  }
});
