import React from 'react'
import {SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute} from './SidebarElements'

const Sidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon  onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="liveStreams" onClick={toggle}>
                        Livestreams
                    </SidebarLink>
                    <SidebarLink to="graphic" onClick={toggle}>
                        Graphic analysis
                    </SidebarLink>
                    <SidebarLink to="predictions" onClick={toggle}>
                        Predictions
                    </SidebarLink>
                    {/* <SidebarLink to="Sign Up" onClick={toggle}>
                        Sign Up
                    </SidebarLink> */}
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute >
                        Connect
                    </SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
