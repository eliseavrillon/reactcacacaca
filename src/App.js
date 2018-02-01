import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

//Je crée mon composant
class App extends React.Component {
    constructor() { //j'initialise mon état(state) dans la fonction constructor
        super();
        //je crée des tableau vide pour les séries et les épisodes qui se rempliront
        this.state = {
            seriesList: [],
            seriesEpisodesList: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleChange(event) {
        this.setState({value: event.target.value.toLowerCase()});
    }

    componentDidMount() { 
        //on recherche les series
        fetch('seriesList.json', {}) //je récupère le tableau
        //promesse d'afficher une réponse
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesList: seriesListDepuisFichier});

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                /* alert("j'ai fait ce que j'ai pu");*/
            });
        //on recherche les épiosdes des séries
        fetch('seriesEpisodesList.json', {})
        //promesse d'afficher une réponse
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesEpisodesList: seriesListDepuisFichier});

            })
            .catch(function (error) {
                console.log(error);
            })

    }

    //on effectue un rendu
    render() {
        return (
            <div class="wrapper">
                <div id="header">
                    <p>Trouvez votre série préférée :</p>
                    <input id="recherche" type="text" value={this.state.value}
                           onChange={this.handleChange}/>
                    <ul>
                        {this.state.value !== "" ?
                            //fonction pour afficher les séries sous forme de liste
                            this.state.seriesList.filter(
                                e => e.seriesName.indexOf(this.state.value) > -1).map(item => <li
                                key={item.id}>{item.seriesName}

                                <ul>

                                    {this.state.seriesEpisodesList.filter(
                                        f => f.serie_id == item.id).map(episode => episode.episodes_list.filter(
                                        g => g.episodeName).map(name => <li>{name.episodeName}</li>)
                                    )

                                    }
                                </ul>
                            </li>)

                            //quand plus rien n'est marque
                            : <p>Rien n'est Marqué</p>
                        }
                    </ul>
                </div>
            </div>
        )
    }
}


export default App;
