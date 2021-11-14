import React, { useState } from 'react';
import '../App.css';
import {
  Link
} from 'react-router-dom';
import { Typography, IconButton, Grid, Dialog, makeStyles, Theme, createStyles, Snackbar, SvgIcon } from '@material-ui/core';
import { ReactComponent as SafestakeLogoMainSvg } from '../assets/logo-white5.svg';
import { GitHub, Twitter, YouTube } from '@material-ui/icons';
import { ReactComponent as Discord } from '../assets/discord-brands.svg';
import { Alert } from '@material-ui/lab';
import { Color } from '@material-ui/lab/Alert';
import { ValidatorListStandAlone } from '../components/ValidatorListStandAlone';

const styles = {
  smallIcon: {
    fontSize: "1.4em",
    color: "#0C2533"
  },
  mediumIcon: {
    fontSize: "1.5em",
    color: "#0C2533"
  },
  largeIcon: {
    fontSize: "1.7em",
    color: "#0C2533"
  },
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
  }),
);

interface Message {
  open: boolean;
  content: string;
  severity: Color;
};

export function Landing() {
  const [message, setMessage] = useState<Message>({ open: false, content: '', severity: 'success' });
  const [open, setOpen] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleCloseVideo() {
    setOpenVideo(false);
  }

  function handleCloseSnackbar() {
    setMessage({ open: false, content: '', severity: 'success' });
  }

  const classes = useStyles();
  return (
    <div id="landing">
      <div className={classes.root} style={{ minHeight: '120vh', textAlign: 'center', overflow: 'hidden' }}>

        <div className="flex flex-col items-center">
          <div className="sm:block lg:flex sm:flex-wrap md:flex-col lg:flex-row justify-center text-center lg:mt-16">
            <div>
              <div className="flex-col  justify-center text-center p-0">
                <div className="flex  justify-center text-center pb-16">
                  <div className=" w-2/4 lg:w-2/3 xl:w-1/8 pt-5 md:pt-0">
                    <SafestakeLogoMainSvg />
                  </div>
                </div>
                <div className="flex justify-center text-center md:pb-10">
                  <Link to="/app">
                    <div className=" tracking-wider safeBtnInverted">
                      <span className="text-md sm:text-xl p-2">Stake now</span>
                    </div>
                  </Link>
                </div>
              </div>
              <Typography style={{ visibility: 'hidden' }}>
                Hack for non working svg scaling SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
              </Typography>
            </div>
            <>
              <div className="font-display uppercase text-4half sm:text-5xl md:text-6xl text-solblue-dark dark:text-solblue font-bold leading-tight">
                <p className="inline px-2 md:block md:px-0">Stake your SAFE</p>
                <p className="inline px-2 md:block md:px-0">manage accounts</p>
                <p className="inline px-2 md:block md:px-0">earn rewards</p>

                <div className="uppercase text-solblue-dark dark:text-gray-300 text-2xl sm:text-3xl pt-3 md:font-light dark:font-normal">
                  Staking Safecoin made easy
                </div>
              </div>
            </>
          </div>
          <ValidatorListStandAlone />
          <Grid item xs={10}>
            <div className="flex flex-col items-center  justify-center text-center pb-5 pt-10">
              <div className="w-4/6 text-lg text-solblue-darker dark:text-gray-300 pb-5">You want to know more about SafeCoin ? <a href="https://safecoin.org/"><b>Visit our website !</b></a></div>
              <div className="w-4/6 text-lg text-solblue-darker dark:text-gray-300">Safestake is a completely open source, non-custodial staking platform for simple straightforward staking and management of Safecoin, the world's most performant community blockchain.</div>
              <div className="text-sm pt-5 opacity-70 dark:text-gray-300">A huge thanks to <a href="https://solstake.io">SolStake.io</a>, the world's first open source Solana Staking platform, for making this possible.</div>
            </div>

            <div>
              <IconButton
                href="https://github.com/Fair-Exchange/safestake"
                rel="noopener noreferrer" target="_blank"
              >
                <GitHub style={styles.smallIcon} />
              </IconButton>
              <IconButton
                onClick={() => setOpenVideo(true)}
              >
                <YouTube style={styles.largeIcon} />
              </IconButton>
              <IconButton
                href="https://discord.com/invite/vQgYGJz"
                rel="noopener noreferrer" target="_blank"
              >
                <SvgIcon style={styles.smallIcon}>
                  <Discord />
                </SvgIcon>
              </IconButton>
              <IconButton
                href="https://twitter.com/safecoins"
                rel="noopener noreferrer" target="_blank"
              >
                <Twitter style={styles.mediumIcon} />
              </IconButton>
            </div>
          </Grid>
        </div>
      </div>
      <Dialog
        open={openVideo}
        fullWidth
        maxWidth="md"
        onClose={handleCloseVideo}
      >
        <div className="videoWrapper">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/JUDG6j5ktW4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </Dialog>
      <Snackbar open={message.open} autoHideDuration={10000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleClose} severity={message.severity}>
          {message.content}
        </Alert>
      </Snackbar>
    </div>
  );
}