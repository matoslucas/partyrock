import React from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify'
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
// import Typography from '@material-ui/core/Typography';
import pink from '@material-ui/core/colors/pink';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';

// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import CloseIcon from '@material-ui/icons/Close';

import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

import Hand from '../svg/Hand'

const styles = theme => ({
    card: {
        maxWidth: 350,
        minWidth: 300,
    },
    margin: {
        margin: 0,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: pink[500],
    },
});

class EventCard extends React.Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            expanded: this.props.single,
            disabledButton: false,
        }

        this.handleExpandClick = this.handleExpandClick.bind(this)
        this.onClickHandler = this.onClickHandler.bind(this)
        // this.imageClickHandler = this.imageClickHandler.bind(this)
        this.createMarkup = this.createMarkup.bind(this)
    }

    handleExpandClick() {
        this.setState(state => ({ expanded: !state.expanded }));
    }

    onClickHandler() {
        //hideButton
        this.setState({ disabledButton: true });
        this.props.onSave(this.props.data)
    }

    formatDate(dateTime) {

        let newDateString = dateTime
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }


        if (window.Intl) {
            const d = new Date(dateTime)
            newDateString = new Intl.DateTimeFormat('en-US', options).format(d)
        }
        // console.log(dateTime, newDateString)

        return newDateString
    }

    createMarkup(text) {
        if (!text) return ""
        var newText = text.replace(
            '(www.[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(/S*)?)/g',
            '<a href="//$1">$1</a>'
        )
        // console.log(newText)
        return newText
    }

    render() {
        const { expanded, disabledButton } = this.state
        const {
            classes,
            scraping,
            GoogleCalendarLink,
            sign,
            single,
        } = this.props
        const { id, name, interested_count, attending_count, start_time, description, cover, place } = this.props.data
        const { location } = this.props.data.place
        let mapValues = ""
        if (location && location.street && location.city && location.state && location.zip) {
            mapValues = location.street.split(' ').join('+') + '+' + location.city + '+' + location.state + '+' + location.zip
        } else {
            mapValues = String(place.name).replace(/,/g, "").split(' ').join('+')
        }


        const URLTOSHARE = 'https://partyrocktonight.com/event/' + id

        const URLMAP = 'https://www.google.com/maps/dir/?api=1&destination=' + mapValues

        const street = location && location.street ? location.street : "TBD"


        let tags = "🤘 💃 🕺 👨‍🎤 🎤 🎸 🎵"+`\n`
        tags +=`#afuegofridays`+`\n`
        tags += `#wolverinecrossing`+`\n`
        tags += `#livetheriv`+`\n`
        tags += `#branburyapts`+`\n`
        tags += `#libertysquare`+`\n`
        tags += `#alpine_village`+`\n`
        tags += `#raintreecommons`+`\n` 
        tags += `#lodgesatglenwood`+`\n` 
        tags += `#uvulife`+`\n`
        tags += `#byulife`+`\n` 
        tags += `#thevillageatsouthcampus`+`\n`
        tags += `#provoparties`+`\n` 
        tags += `#provogirls`+`\n` 
        tags += `#uvuinstitute`+`\n` 
        tags += `#uvuwolverines`+`\n` 
        tags += `#byucougars`+`\n` 
        tags += `#byucougarettes`+`\n` 
        tags += `#provosocial`+`\n` 
        tags += `#thetribeutah`+`\n`
     


        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Link to={single ? '/' : '/event/' + id}>
                            <Avatar aria-label="Event" className={classes.avatar}>
                                <Hand />
                            </Avatar>
                        </Link>
                    }
                    action={
                        scraping ?
                            <IconButton onClick={this.onClickHandler} disabled={disabledButton}>
                                <SendIcon />
                            </IconButton>
                            :
                            <IconButton onClick={this.onClickHandler} disabled={disabledButton}>
                                {
                                    sign && !GoogleCalendarLink ? <FavoriteBorderIcon /> : null
                                }
                            </IconButton>

                    }
                    title={<h3 style={{fontFamily:'Chilanka'}}>{name}</h3>}
                    subheader={this.formatDate(start_time)}
                />
                <Link to={'/event/' + id}>
                    <CardMedia
                        className={classes.media}
                        image={cover && cover.source ? cover.source : null}
                        title=""
                    />
                </Link>

                <CardContent style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}>
                    {location ?
                        <Button
                            href={URLMAP}
                            target="_blank"
                            style={{ width: '100%' }}
                            size="small"
                            variant="outlined"
                            color="secondary" >
                            { street + ', ' + location.city + ', ' + location.state}
                        </Button>
                        :
                        <Button
                            href={URLMAP}
                            target="_blank"
                            style={{ width: '100%' }}
                            size="small"
                            variant="outlined"
                            color="secondary" >
                            {place.name}
                        </Button>
                    }

                    {/*
                    single? null:  
                        <Button style={{width: '100%'}} size="small" variant="outlined" color="secondary" onClick={this.handleExpandClick}>
                            {expanded?<CloseIcon />:<MoreHorizIcon />}
                        </Button>
                    */}

                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>

                    <Chip
                        icon={<FaceIcon />}
                        label={attending_count}
                        className={classes.chip}
                        color="secondary"
                        deleteIcon={<FavoriteIcon />}
                    />

                    <Chip
                        icon={<FavoriteIcon />}
                        label={interested_count}
                        className={classes.chip}
                        color="secondary"
                        deleteIcon={<FavoriteIcon />}
                    />


                    <Fab
                        href={'https://www.facebook.com/sharer/sharer.php?u=' + URLTOSHARE}
                        target="_blank"
                        size="small"
                        aria-label="Share">
                        <ShareIcon />
                    </Fab>
                    {single ? null :
                        <Fab size="small"
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Show more">
                            <ExpandMoreIcon />
                        </Fab>
                    }

                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <pre
                            style={{ color: '#fff', whiteSpace: 'pre-line' }}
                        >
                            <Linkify>{description}</Linkify>
                            <hr />
                            <div>{tags}</div>
                        </pre>
                        <Divider variant="middle" />
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

EventCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventCard);
