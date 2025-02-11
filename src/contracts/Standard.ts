/**
 * Copyright 2020 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { PublicAccount, Deadline, Transaction, UInt64 } from 'symbol-sdk'
import { TransactionURI } from 'symbol-uri-scheme'

// internal dependencies
import {
  AllowanceResult,
  Command,
  CommandOption,
  Context,
  Notification,
  NotificationProof,
  TokenIdentifier,
  NetworkConfig,
  TransactionParameters,
} from '../../index'

/**
 * @interface Standard
 * @package contracts
 * @since v0.1.0
 * @description Interface that describes security token standards.
 */
export interface Standard {
  /**
   * @description The network configuration object.
   */
  readonly network: NetworkConfig

  /**
   * @description The token identifier
   */
  readonly identifier: TokenIdentifier

  /**
   * Synchronize the command execution with the network. This method shall
   * be used to fetch data required for execution.
   *
   * @async
   * @return {Promise<boolean>}
   */
  synchronize(): Promise<boolean>

  /**
   * Notify an account `account` about `notification`
   *
   * @param   {TokenIdentifier} tokenId
   * @param   {PublicAccount}   account
   * @param   {Notification}    notification
   * @param   {TransactionParameters} parameters
   * @return  {NotificationProof}
   **/
  notify(
    tokenId: TokenIdentifier,
    account: PublicAccount,
    notification: Notification,
    parameters: TransactionParameters,
  ): NotificationProof

  /**
   * Verifies **allowance** of `sender` to transfer `tokenId` security token
   * to `recipient` with a number of shares attached of `amount`.
   *
   * @param   {TokenIdentifier} tokenId
   * @param   {PublicAccount}   sender
   * @param   {PublicAccount}   recipient
   * @param   {number}          amount
   * @return  {AllowanceResult}
   **/
  canTransfer(
    tokenId: TokenIdentifier,
    sender: PublicAccount,
    recipient: PublicAccount,
    amount: number,
  ): AllowanceResult

  /**
   * Verifies **allowance** of `operator` to execute `command` with `tokenId` security token.
   *
   * @internal This method MUST use the `Command.canExecute()` method.
   * @param   {PublicAccount}         actor
   * @param   {TokenIdentifier}       tokenId
   * @param   {string}                command
   * @param   {Array<CommandOption>}  argv
   * @return  {AllowanceResult}
   **/
  canExecute(
    actor: PublicAccount,
    tokenId: TokenIdentifier,
    command: string,
    argv: CommandOption[]
  ): AllowanceResult

  /**
   * Execute `command` for Security Token with identifier `tokenId`. Arguments
   * the command execution can be passed in `argv`.
   * 
   * This method MUST call the `synchronize()` method.
   *
   * @internal This method MUST use the `Command.execute()` method.
   * @param   {PublicAccount}         actor
   * @param   {TokenIdentifier}       tokenId
   * @param   {string}                command
   * @param   {TransactionParameters} parameters
   * @param   {Array<CommandOption>}  argv
   * @return  {Promise<TransactionURI>}
   **/
  execute(
    actor: PublicAccount,
    tokenId: TokenIdentifier,
    command: string,
    parameters: TransactionParameters,
    argv: CommandOption[],
  ): Promise<TransactionURI<Transaction>>

  /**
   * Execute `command` for Security Token with identifier `tokenId`. Arguments
   * the command execution can be passed in `argv`.
   * 
   * This method MUST NOT call the `synchronize()` method.
   *
   * @internal This method MUST use the `Command.execute()` method.
   * @param   {PublicAccount}         actor
   * @param   {TokenIdentifier}       tokenId
   * @param   {string}                command
   * @param   {TransactionParameters} parameters
   * @param   {Array<CommandOption>}  argv
   * @return  {TransactionURI}
   **/
  executeWithoutSync(
    actor: PublicAccount,
    tokenId: TokenIdentifier,
    command: string,
    parameters: TransactionParameters,
    argv: CommandOption[],
  ): TransactionURI<Transaction>
}
