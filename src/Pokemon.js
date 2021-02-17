import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import mockData from './mockData';
import { Typography, Link, CircularProgress, Button, Card } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


const useStyles = makeStyles({
    cardContent: {
        textAlign: "center",
    }
});

function Pokemon(props) {
    const classes = useStyles();
    const history = useHistory();
    let { id } = useParams();
    const [pokemon, setPokemon] = useState(mockData[`${id}`]);

    const toFirstCharUppercase = name =>
        name.charAt(0).toUpperCase() + name.slice(1);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(function (response) {
            const { data } = response;
            setPokemon(data);
        }).catch(function (error) {
            setPokemon(false);
        });
    },[id]);

    const generatePokemon = () => {
        const { name, id, species, height, weight, types, sprites } = pokemon;
        const fullImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        const { front_default } = sprites;

        return (
            <>
               <Card className={classes.cardContent}>
               <Typography variant="h1">
                    {`${id}.`} {toFirstCharUppercase(name)}
                    <img src={front_default} />
                </Typography>
                <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
                <Typography variant="h3">Pokemon Info</Typography>
                <Typography>
                    {"Species: "}
                    <Link href={species.url}>{species.name}</Link>
                </Typography>
                <Typography >Height: {height}</Typography>
                <Typography >Weight: {weight}</Typography>
                <Typography >{types.map((typeinfo) => {
                    const { type } = typeinfo
                    const { name } = type;
                    return <Typography key={name}>Types: {`${name}`}</Typography>
                })}</Typography>
               </Card>
            </>
        );
    }

    return (
        <>
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemon()}
            {pokemon === false && <Typography>Pokemon not found</Typography>}
            {pokemon !== undefined && (
                <Button className={classes.cardMedia} variant="contained" onClick={() => history.push("/")}>Back to pokedex</Button>
            )}
        </>
    );
}

export default Pokemon;