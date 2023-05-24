import * as React from 'react';
import { Transition } from 'react-transition-group';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

interface Props {
    open : boolean
    onClose : any
    title : string
    desc : string
}

export default function ModalAlertPrimary({
 open, onClose, title, desc
}:Props) {
  return (
    <Transition in={open} timeout={400}>
      {(state: string) => (
        <Modal
          keepMounted
          open={!['exited', 'exiting'].includes(state)}
          onClose={onClose}
          slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: 'none',
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                    entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                  }[state],
                },
              },
            }}
          sx={{
              visibility: state === 'exited' ? 'hidden' : 'visible',
            }}
        >
          <ModalDialog
            aria-labelledby="fade-modal-dialog-title"
            aria-describedby="fade-modal-dialog-description"
            sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
          >
            {title !== undefined && (
            <Typography id="fade-modal-dialog-title" component="h2">
              {title}
            </Typography>
            )}
            {desc !== undefined
            && (
            <Typography
              id="fade-modal-dialog-description"
              textColor="text.tertiary"
            >
              Using `react-transition-group` to create a fade animation.
            </Typography>
            )}
          </ModalDialog>
        </Modal>
        )}
    </Transition>
  );
}
