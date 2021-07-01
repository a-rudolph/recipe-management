import { Box, Card, Close, Grid, SxProps } from 'theme-ui'
import { useEffect, useRef } from 'react'

type ModalProps = {
  visible?: boolean
  children: React.ReactNode
  cardStyle?: SxProps
  maskStyle?: SxProps
  onClose?: VoidFunction
}

export default function Modal({
  visible,
  children,
  maskStyle,
  cardStyle,
  onClose,
}: ModalProps) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (visible) {
      document.body.appendChild(modalRef.current)
      return
    }

    try {
      document.body.removeChild(modalRef.current)
    } catch (e) {
      console.error(e)
    }
  }, [visible])

  return (
    <Box
      onClick={onClose}
      ref={modalRef}
      sx={{
        bg: 'rgb(0, 0, 0, 0.4)',
        height: '100vh',
        width: '100vw',
        zIndex: 51,
        display: visible ? 'block' : 'none',
        position: 'absolute',
        top: 0,
        ...maskStyle,
      }}
    >
      <Card
        onClick={(e) => e.stopPropagation()}
        sx={{
          borderRadius: '4px',
          boxShadow: '1px 2px 3px 0 rgb(0, 0, 0, 0.8)',
          zIndex: 52,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '90vw',
          width: '400px',
          height: '320px',
          bg: 'muted',
          ...cardStyle,
        }}
      >
        <Grid
          sx={{
            padding: '16px',
            position: 'relative',
          }}
        >
          <Close
            sx={{
              position: 'absolute',
              right: '8px',
              top: '8px',
            }}
            onClick={onClose}
          />
          {children}
        </Grid>
      </Card>
    </Box>
  )
}
