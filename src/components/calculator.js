// Imports.
import React from 'react'
import 'weather-icons/css/weather-icons.css'
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            username: null,
            var: 'Delhi'
        }
    }
    handleSubmit = (event) => {
        this.setState({ var: this.state.username });
        event.preventDefault();
        this.func();
        this.setState({ username: '' });
    }
    handleChange = event => {
        this.setState({ username: event.target.value });
    };
    func() {

        fetch('http://api.openweathermap.org/data/2.5/weather?appid=c25a210f1e942555b1322f4bcd1cfe47&q=' + this.state.username).then((resp) => {
            resp.json().then((result) => {
                console.log(result);
                if (result.cod === '404') {
                    alert("Enter valid city name");
                    window.location.reload(false);
                }
                else {
                    this.setState({ users: result })
                }
            })
        })
    }
    check() {
        console.log(this.state.users.cod);

        console.log('KOi khe kehta rhe');
        if (this.state.users.cod === '404') {
            alert("Enter valid city name");
            window.location.reload(false);
        }
    }
    componentDidMount() {

        fetch('http://api.openweathermap.org/data/2.5/weather?appid=c25a210f1e942555b1322f4bcd1cfe47&q=Delhi').then((resp) => {
            resp.json().then((result) => {
                console.log(result);
                this.setState({ users: result })
            })
        })
    }
    solver()
    {
        var myNumber = eval(this.state.users.main.temp - 273.00).toFixed(1);
var sign = myNumber?myNumber<0?-1:1:0;
myNumber = myNumber * sign + '';
var dec = myNumber.match(/\.\d+$/);
var int = myNumber.match(/^[^\.]+/);

var formattedNumber = ((sign < 0 ? '-' : '') + ("0" + int).slice(-2) + (dec !== null ? dec : ''));
return formattedNumber;

    }

    icon(){
        if(this.state.users.weather[0].id===781)
        {
            return(
                <i class="wi wi-tornado"/>
            )
        }
        if(this.state.users.weather[0].id===761)
        {
            return(
                <i class="wi wi-dust"/>
            )
        }
        if(this.state.users.weather[0].id===711)
        {
            return(
                <i class="wi wi-smoke"/>
            )
        }
        if(this.state.users.weather[0].id===731)
        {
            return(
                <i class="wi wi-dust"/>
            )
        }
        if(this.state.users.weather[0].id===741)
        {
            return(
                <i class="wi wi-fog"/>
            )
        }
        if(this.state.users.weather[0].id===762)
        {
            return(
                <i class="wi wi-dust"/>
            )
        }
        if(this.state.users.weather[0].id>=200 && this.state.users.weather[0].id<300)
        {
            return(
                <i class="wi wi-lightning"/>
            )
        }
        if(this.state.users.weather[0].id>=300 && this.state.users.weather[0].id<400)
        {
            return(
                <i class="wi wi-sprinkle"/>
            )
        }
        if(this.state.users.weather[0].id>=500 && this.state.users.weather[0].id<600)
        {
            return(
                <i class="wi wi-rain"/>
            )
        }
        if(this.state.users.weather[0].id>=600 && this.state.users.weather[0].id<700)
        {
            return(
                <i class="wi wi-snow"/>
            )
        }
        if(this.state.users.weather[0].id>=700 && this.state.users.weather[0].id<800)
        {
            return(
                <i class="wi wi-cloudy-gusts"/>
            )
        }
        if(this.state.users.weather[0].id===800)
        {
            return(
                <i class="wi wi-cloud"/>
            )
        }
        if(this.state.users.weather[0].id>800)
        {
            return(
                <i class="wi wi-cloudy"/>
            )
        }

    }
    render() {
        return (
            <div>
                <div className="query">
                    <form onSubmit={this.handleSubmit}>
                        <label>
          <input class="city" placeholder="Enter the city name..." type="text" value={this.state.username} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <div  id="box">
                    <div class="color-back-img"></div>
                    <h1>Weather Report</h1>
                    <img alt="mist" src="https://gatoledo.com/recursos.png" class="img-card"></img>
                    {
                        this.state.users ?
                            <div className="des">
                                <h2>{this.state.var},{this.state.users.sys.country}</h2>
                                <div className="te">
                                    <div className="temp">{this.solver()}</div>
                                    <div className="unit">°C</div>
                                    <div className="max">{eval(this.state.users.main.temp_min - 273.00).toFixed(1)} °C</div>
                                    <div className="min">{eval(this.state.users.main.temp_max - 273.00).toFixed(1)} °C</div>
                                </div>
                                <div class="weimg">
                                      {this.icon()}
                                    <p>{this.state.users.weather[0].main}</p>
                                </div>
                                <div>
                                    <p>-</p>
                                    <p className="info" >Feels like-- <i id="ic" class="wi wi-thermometer"></i> {eval(this.state.users.main.feels_like - 273.00).toFixed(1)}°C</p>
                                    <p className="info" >Wind-- <i id="ic" class="wi wi-strong-wind"></i> {this.state.users.wind.speed} m/h</p>
                                <p className="info" >Pressure-- <i id="ic" class="wi wi-barometer"></i> {this.state.users.main.pressure} Pa</p>
                                <p className="info">Humidity-- <i id="ic" class="wi wi-humidity"></i>  {this.state.users.main.humidity} %</p>
                                <p className="info">Cloud Cover-- <i id="ic" class="wi wi-cloud"></i>  {this.state.users.clouds.all} %</p>
                                </div>

                            </div>
                            : null
                    }
                </div>
            </div>
        );
    }
}

// Export Calculator Component.
export default App;