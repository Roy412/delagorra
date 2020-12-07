import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native';

import { hitSlopArea } from 'utils/presentational'
import PickingService from 'services/picking'
import { getMetrics, getColor, getSpace, getLineHeight } from 'theme'
import { arrow2Icon } from 'images'
import { StatusBar as StatusBarUI } from 'components/blocks'
import { Box, Text, IconButton } from 'components/ui'

export const Container = styled(SafeAreaView)`
  overflow: hidden;
`

export const Content = styled.View`
  flex-direction: row;
  height: 44px;
  align-items: center;
`

export const StatusBar = styled(StatusBarUI).attrs((props) => ({
  backgroundColor: getColor(props.bg)(props),
}))``

export const Content = styled(Box).attrs((props) => ({
  py: 3,
  px: 4,
  ...PickingService.platform({
    ios: {
      mt: getMetrics('statusBarHeight')(props),
    },
  }),
}))`
  height: ${getMetrics('mainHeaderHeight')}px;
  justify-content: flex-end;
  align-items: center;
`

export const InnerContent = styled.View`
  flex-direction: row;
  flex: 1;
`

export const Title = styled(Text).attrs({
  fontSize: 2,
  fontStyle: 'Bold',
  numberOfLines: 1,
  color: 'white',
})`
  flex: 1;
  text-align: ${({ sideLarge }) => (sideLarge ? 'left' : 'center')};
  margin-left: ${({ sideLarge }) => (sideLarge ? '10px' : '0')};
  line-height: 27px;
`

export const Left = styled(Box).attrs({
  mr: 1,
})`
  width: ${({ sideLarge }) => (sideLarge ? 'auto' : '60px')};
  height: ${getLineHeight(2)}px;
  justify-content: center;
`

export const Right = styled(Box).attrs({
  ml: 1,
})`
  width: ${({ sideLarge }) => (sideLarge ? 'auto' : '60px')};
  height: ${getLineHeight(2)}px;
  justify-content: center;
  align-items: flex-end;
`

export const Back = styled(IconButton).attrs((props) => ({
  iconGlyph: arrow2Icon,
  iconTintColor: 'white',
  iconSize: 20,
  hitSlop: hitSlopArea(getSpace(4)(props)),
}))``
