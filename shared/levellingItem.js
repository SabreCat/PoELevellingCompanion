import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Progress } from "../data/progress.js";
import FormattedText from "../shared/formattedText.js";
import {globalStyles} from "../styles/global.js";

export default class LevellingItem extends React.Component {

  state = {};

  constructor(props) {
    super(props)

    this.state = {
      "item": props.item,
      "act": props.act,
      "complete": props.complete,
      "pressHandler": props.pressHandler
    };
  }

  shouldComponentUpdate() {
    //TODO - allow some stuff to rerender
    return false;
  }

  render() {
    var item     = this.state.item;
    var act      = this.state.act;
    var complete = this.state.complete;
    var pressHandler = this.state.pressHandler;

    var objectiveStyle = [];
    var rewardStyle    = [globalStyles.infoItem];

    if (complete) {
      objectiveStyle.push(globalStyles.complete)
      rewardStyle.push(globalStyles.complete);
    }

    if ( !item.optional ) {
      objectiveStyle.push(globalStyles.required)
    }

    var objectiveLine = [];

    var key = item.id;

    objectiveLine.push(
      <FormattedText key={key}
                     taskId={item.id}
                     style={objectiveStyle}>
        {item.text}
      </FormattedText>
    );

    var infoLine = [];
    if (item.minLvl) {
      infoLine.push(<Text key="{key}MinLvl"
                          style={rewardStyle}>Min lvl: {item.minLvl}</Text>);
    }
    if (item.direction) {
      var direction = "?";

      switch (item.direction) {
        case "N":
          direction = "↑";
          break;

        case "NE":
          direction = "↗";
          break;

        case "E":
          direction = "→";
          break;

        case "SE":
          direction = "↘";
          break;

        case "S":
          direction = "↓";
          break;

        case "SW":
          direction = "↙";
          break;

        case "W":
          direction = "←";
          break;

        case "NW":
          direction = "↖";
          break;
      }
      infoLine.push(<Text key="{item.id}Direction"
                          style={rewardStyle}>Go {direction}</Text>);
    }
    if (item.rewards) {
      var reward = [];
      if (item.rewards.passive) {
        reward.push(<Text style={rewardStyle}
                          key={item.id + "PassiveReward"} >+{item.rewards.passive.num}</Text>);
      }
      if (item.rewards.item) {
        reward.push(<Text style={rewardStyle}
                          key={item.id + "ItemReward"}>{item.rewards.item}</Text>);
      }
      infoLine.push(<Text key={item.id + "GenericReward"}
                          style={rewardStyle}>Reward: {reward}</Text>);
    }

    return (
      <View key={"LevellingContainer" + item.id}>
        <TouchableOpacity key={"Touchable" + item.id}
                          onPress={() => pressHandler(act, item.id)}>
          <View key={"ObjectiveContainer" + item.id}
                style={globalStyles.item}>
            { objectiveLine }
            <View key={"RewardContainer" + item.id}
                  style={globalStyles.info}>
              { infoLine }
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
