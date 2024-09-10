import { makeObservable, observable } from "mobx"
import type { MotionGroupStateResponse } from "@wandelbots/wandelbots-api-client"

class MockBaseConnectedMotionGroup {
  rapidlyChangingMotionState: MotionGroupStateResponse

  constructor(rapidlyChangingMotionState: MotionGroupStateResponse) {
    this.rapidlyChangingMotionState = rapidlyChangingMotionState

    makeObservable(this, {
      rapidlyChangingMotionState: observable,
    })
  }
}

export class MockConnectedMotionGroup extends MockBaseConnectedMotionGroup {
  public _dhParameters: Array<{
    a: number
    d: number
    alpha: number
    theta: number
    reverse_rotation_direction: boolean
  }>

  constructor(
    dhParameters: Array<{
      a: number
      d: number
      alpha: number
      theta: number
      reverse_rotation_direction: boolean
    }>,
    rapidlyChangingMotionState: MotionGroupStateResponse,
  ) {
    super(rapidlyChangingMotionState)

    this._dhParameters = dhParameters
    this.rapidlyChangingMotionState = rapidlyChangingMotionState

    makeObservable(this, {
      _dhParameters: observable,
    })
  }

  get dhParameters() {
    return this._dhParameters
  }
}
