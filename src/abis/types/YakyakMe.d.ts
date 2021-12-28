/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface YakyakMeInterface extends ethers.utils.Interface {
  functions: {
    "addressToName(address)": FunctionFragment;
    "nameToAddress(bytes32)": FunctionFragment;
    "take(bytes32)": FunctionFragment;
    "update(bytes32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addressToName",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "nameToAddress",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "take", values: [BytesLike]): string;
  encodeFunctionData(functionFragment: "update", values: [BytesLike]): string;

  decodeFunctionResult(
    functionFragment: "addressToName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nameToAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "take", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "update", data: BytesLike): Result;

  events: {
    "Take(address,bytes32)": EventFragment;
    "Update(address,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Take"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Update"): EventFragment;
}

export type TakeEvent = TypedEvent<
  [string, string] & { account: string; name: string }
>;

export type UpdateEvent = TypedEvent<
  [string, string] & { account: string; name: string }
>;

export class YakyakMe extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: YakyakMeInterface;

  functions: {
    addressToName(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    nameToAddress(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    take(
      nameBytes: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    update(
      nameBytes: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addressToName(arg0: string, overrides?: CallOverrides): Promise<string>;

  nameToAddress(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;

  take(
    nameBytes: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  update(
    nameBytes: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addressToName(arg0: string, overrides?: CallOverrides): Promise<string>;

    nameToAddress(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;

    take(nameBytes: BytesLike, overrides?: CallOverrides): Promise<void>;

    update(nameBytes: BytesLike, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Take(address,bytes32)"(
      account?: string | null,
      name?: BytesLike | null
    ): TypedEventFilter<[string, string], { account: string; name: string }>;

    Take(
      account?: string | null,
      name?: BytesLike | null
    ): TypedEventFilter<[string, string], { account: string; name: string }>;

    "Update(address,bytes32)"(
      account?: string | null,
      name?: BytesLike | null
    ): TypedEventFilter<[string, string], { account: string; name: string }>;

    Update(
      account?: string | null,
      name?: BytesLike | null
    ): TypedEventFilter<[string, string], { account: string; name: string }>;
  };

  estimateGas: {
    addressToName(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    nameToAddress(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    take(
      nameBytes: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    update(
      nameBytes: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addressToName(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nameToAddress(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    take(
      nameBytes: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    update(
      nameBytes: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
