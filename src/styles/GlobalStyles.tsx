// src/styles/GlobalStyles.tsx
import { Global } from '@emotion/react'
import tw, { css, theme, GlobalStyles as BaseStyles } from 'twin.macro'
import React from 'react';

const customStyles = css({
    body: {
        WebkitTapHighlightColor: theme`colors.purple.500`,
        ...tw`antialiased`,
    },
})

export default function GlobalStyles () {

    return (<>
        <BaseStyles/>
        <Global styles={customStyles}/>
    </>)
}