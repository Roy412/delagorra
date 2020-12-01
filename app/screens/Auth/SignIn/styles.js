import styled from 'styled-components/native'

import { TextButton, Image, Button as ButtonUI, Text as TextUI, IconButton } from 'components/ui'
import { appIconImage, profileIcon, lockIcon, closeIcon } from 'images'
import { ContainerWithBottomSpace as ContainerUI } from 'screens/common/styles'
import { getMetrics, getColor } from 'theme'

export * from 'screens/common/styles'
export { Loader } from 'components/ui'

export const Wrapper = styled(ContainerUI).attrs({
  bg: 'softPink',
})``

export const FormContainer = styled.View`
  flex: 1;
  justify-content: center;
`

export const ForgotButton = styled(TextButton).attrs({
  title: 'Forgot Password?',
  color: 'lightGray',
  fontStyle: 'Medium',
  fontSize: 17,
  mr: 10,
  mt: 23,
})`
  align-self: flex-end;
`

export const SignInButton = styled(ButtonUI).attrs((props) => ({
  textStyle: {
    color: getColor('softPink')(props),
    fontSize: 20,
  },
  title: 'Sign In',
  variant: 'fourth',
}))`
  margin-top: 80px;
  padding-left: 50px;
  padding-right: 50px;
  height: 60px;
  border-radius: 30px;
  align-self: center;
`

export const AppIcon = styled(Image).attrs({
  source: appIconImage,
})`
  margin-top: 100px;
  width: ${(props) => (getMetrics('screenWidth')(props) * 218) / 750}px;
  height: ${(props) => (getMetrics('screenWidth')(props) * 235) / 750}px;
  align-self: center;
`

export const ProfileIcon = styled(Image).attrs({
  source: profileIcon,
})`
  width: 30px;
  height: 34px;
`

export const LockIcon = styled(Image).attrs({
  source: lockIcon,
})`
  width: 30px;
  height: 40px;
`

export const SignUpButton = styled(TextButton).attrs({
  title: 'Sign Up',
  color: 'white',
  fontSize: 17,
  ml: 10,
})``

export const SignUpWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 25px;
`

export const TextNew = styled(TextUI).attrs({
  color: 'lightGray',
})``

export const CloseButton = styled(IconButton).attrs({
  iconGlyph: closeIcon,
  iconTintColor: 'white',
  iconSize: 24,
})`
  position: absolute;
  top: 20px;
  left: 20px;
`
