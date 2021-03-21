
import React, { useState } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { GestureContainer, CollapsibleHeaderProps } from 'react-native-head-tab-view'
import ScrollableTabView, { DefaultTabBar, ScrollableTabViewProperties } from 'react-native-scrollable-tab-view'

type ZTabViewProps = Omit<ScrollableTabViewProperties, 'ref'> & CollapsibleHeaderProps
type ForwardTabViewProps = ZTabViewProps & { forwardedRef: React.Ref<ScrollableTabView>, Component: typeof ScrollableTabView }

export default function createHeaderTabsComponent(Component: typeof ScrollableTabView, config?: {}): React.ForwardRefExoticComponent<React.PropsWithoutRef<ZTabViewProps> & React.RefAttributes<ScrollableTabView>> {

    return React.forwardRef((props: ZTabViewProps, ref) => {
        return <CollapsibleHeaderTabView {...props} forwardedRef={ref} Component={Component} />
    });

}

<<<<<<< HEAD
const CollapsibleHeaderTabView: React.FC<ForwardTabViewProps> = (props: ForwardTabViewProps) => {
    const [currentIndex, setCurrentIndex] = useState(props.initialPage || 0)
=======
class CollapsibleHeaderTabView extends React.Component<ForwardTabViewProps, { currentIndex: number }>{

    constructor(props: ForwardTabViewProps) {
        super(props)
        this.state = {
            currentIndex: props.initialPage || 0
        }
    }

    renderTabViewContainer = (props: TabViewContainerBaseProps) => {
        const collapsibleParams: CollapsibleHeaderProps = {
            frozeTop: this.props.frozeTop,
            tabbarHeight: this.props.tabbarHeight,
            overflowHeight: this.props.overflowHeight,
            scrollEnabled: this.props.scrollEnabled,
            isRefreshing: this.props.isRefreshing,
            refreshHeight: this.props.refreshHeight,
            makeRoomInRefreshing: this.props.makeRoomInRefreshing,
            onStartRefresh: this.props.onStartRefresh,
            makeScrollTrans: this.props.makeScrollTrans,
            makeHeaderHeight: this.props.makeHeaderHeight,
            renderScrollHeader: this.props.renderScrollHeader,
            renderRefreshControl: this.props.renderRefreshControl
        }

        return <FitTabView
            {...collapsibleParams}
            {...props}
            currentIndex={this.state.currentIndex}
            renderTabView={this.renderTabView} />
    }
>>>>>>> fd9e73fdbb5a7c9ea6d8706c76dc2a95fa4eaa94

    const _onChangeTab = (e: any) => {
        props.onChangeTab && props.onChangeTab(e)
        if (e.i === currentIndex) return;
        setCurrentIndex((preIndex: number) => e.i)
    }

    const _renderTabBar = (mProps: any) => {
        if (props.renderTabBar) return props.renderTabBar(mProps)
        return <DefaultTabBar {...mProps} style={styles.tabbarStyle} />
    }

    const renderTabView = (mProps: {
        renderTabBarContainer: any,
    }) => {
        const { Component } = props
        return <Component
            ref={props.forwardedRef}
            tabBarBackgroundColor={'transparent'}
            {...props}
            renderTabBar={(tabbarProps) => {
                const newProps = { ...tabbarProps }
                delete tabbarProps.scrollValue
                return mProps.renderTabBarContainer(_renderTabBar(newProps))
            }}
            onChangeTab={_onChangeTab}
        />
    }
    return <GestureContainer
        currentIndex={currentIndex}
        renderTabView={renderTabView}
        {...props} />
}


const styles = StyleSheet.create({
    tabbarStyle: {
        backgroundColor: '#fff'
    }
})