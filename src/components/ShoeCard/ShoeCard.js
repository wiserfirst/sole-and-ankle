import React from 'react'
import styled from 'styled-components/macro'

import { COLORS, WEIGHTS } from '../../constants'
import { formatPrice, pluralize, isNewShoe } from '../../utils'
import Spacer from '../Spacer'

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <ImageLabel variant={variant} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  )
}

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`

const Wrapper = styled.article`
  margin-bottom: 64px;
`

const ImageWrapper = styled.div`
  position: relative;
`

const Image = styled.img`
  width: 340px;
`

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`

const Price = styled.span``

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`

const ImageLabel = ({ variant }) => {
  if (variant === 'on-sale') {
    return <OnSale>Sale</OnSale>
  } else if (variant === 'new-release') {
    return <NewRelease>Just Released!</NewRelease>
  } else {
    return null
  }
}

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`

const Label = styled.span`
  position: absolute;
  top: 12px;
  right: -4px;
  font-weight: ${WEIGHTS.bold};
  font-size: 0.875rem;
  padding: 8px;
  border-radius: 2px;
`

const OnSale = styled(Label)`
  background-color: ${COLORS.primary};
`

const NewRelease = styled(Label)`
  background-color: ${COLORS.secondary};
`

export default ShoeCard
