import React from 'react';
import PropTypes from 'prop-types';
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
import Typography from '@material-ui/core/Typography';
import pink  from '@material-ui/core/colors/pink';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';
// import AddCircleIcon from '@material-ui/icons/AddCircle';

import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

import Hand from '../svg/Hand'

const styles = theme => ({
    card: {
        maxWidth: 300,
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
            expanded: false,
            disabledButton:  false, 
        }

        this.handleExpandClick = this.handleExpandClick.bind(this)
        this.onClickHandler = this.onClickHandler.bind(this)
        this.imageClickHandler = this.imageClickHandler.bind(this)

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
        const d = new Date(dateTime)
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }
        return new Intl.DateTimeFormat('en-US', options).format(d)
    }

    imageClickHandler() {
        const { onClick, data} = this.props
        onClick(data.id)
    }

    render() {
        const { disabledButton } = this.state
        const { 
            classes, 
            scraping, 
            GoogleCalendarLink, 
            sign,
         } = this.props
        const { id, name, interested_count, attending_count, start_time, description, cover, } = this.props.data
        const charLimit = 300
        let des1, des2 = ""
        if (description) {
            des1 = description.substring(0, charLimit) + '...';
            des2 = description.substring(charLimit, description.length);
        }

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Link to={'/event/'+ id}>
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
                    title={name}
                    subheader={this.formatDate(start_time)}
                />
                     <Link to={'/event/'+ id}>
                     <CardMedia
                    className={classes.media}
                    image={cover.source}
                    title=""
                />
                </Link>
               
                <CardContent>
                
                    <Typography component="p">
                        {des1}
                    </Typography>
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

                    
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>

                        <Typography paragraph>
                            {des2}
                        </Typography>

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
