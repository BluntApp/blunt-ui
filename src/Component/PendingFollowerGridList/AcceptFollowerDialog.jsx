import {connect} from "react-redux";
import {MuiThemeProvider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import pendingFollowerGridListMuiTheme from "./pendingFollowerGridListMuiTheme";
import Button from "@material-ui/core/Button";
import {
  acceptPendingFollower,
  checkNickNameAvailability,
  closePendingFollowerDialog
} from "../../Store/Action/followerActions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const AcceptFollowerDialog = props => {
  const [open, setOpen] = useState(true);

  const [nickName, setNickName] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    setOpen(props.openFollowerDialog)
  }, [props.openFollowerDialog])

  useEffect(() => {
    setError(props.nickNameCheckError)
  }, [props.nickNameCheckError])

  const handleClose = () => {
    props.closePendingFollowerDialog();
  };

  const acceptPendingFollower=() =>{
    props.acceptPendingFollower(nickName);
  }

  const inputHandler = (event) => {
    setNickName(event.target.value);
  }

  const validateField = (event) => {
    props.checkNickNameAvailability(event.target.value);
  }

  return (
      <MuiThemeProvider theme={pendingFollowerGridListMuiTheme}>
        <div>

          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Accept Follower</DialogTitle>
            <DialogContent>
              <DialogContentText> Accepting Follower's request will allow them to view your post.
                Add Followers NickName (Optional)
              </DialogContentText>
              <TextField
                  autoFocus
                  margin="dense"
                  id="nickName"
                  label="Nick Name"
                  fullWidth
                  onChange={event => inputHandler(event)}
                  onBlur={event => validateField(event)}
                  value={nickName}
                  helperText={error}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button disabled={error.length!=0} onClick={acceptPendingFollower} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </MuiThemeProvider>
  );
}


const mapStateToProps = state => ({
  pendingFollower: state.followerReducer.pendingFollower,
  openFollowerDialog: state.followerReducer.openFollowerDialog,
  nickNameCheckError: state.followerReducer.nickNameCheckError
});

export default connect(mapStateToProps, {closePendingFollowerDialog, acceptPendingFollower, checkNickNameAvailability})(
    AcceptFollowerDialog);
