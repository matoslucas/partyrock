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

    createMarkup() {
        const { description } = this.props.data
        return { __html: description };
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
        const { id, name, interested_count, attending_count, start_time, description, cover } = this.props.data
        const { location } = this.props.data.place
        let mapValues = ""
        if (location) {
            mapValues = location.street.split(' ').join('+') + '+' + location.city + '+' + location.state + '+' + location.zip
        }


        const URLTOSHARE = 'https://partyrocktonight.com/event/' + id

        const URLMAP = 'https://www.google.com/maps/dir/?api=1&destination=' + mapValues

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
                    title={name}
                    subheader={this.formatDate(start_time)}
                />
                <Link to={'/event/' + id}>
                    <CardMedia
                        className={classes.media}
                        image={cover.source}
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
                            {location.street + ', ' + location.city + ', ' + location.state}
                        </Button>
                        : null
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
                            dangerouslySetInnerHTML={{ __html: description }} />
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
