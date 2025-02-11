/**
 * Copyright 2020 NEM
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { 
  AggregateTransaction,
  PublicAccount,
  Transaction,
  TransactionMapping,
} from 'symbol-sdk'
import { TransactionURI } from 'symbol-uri-scheme'

// internal dependencies
import {
  AllowanceResult,
  BaseCommand,
  CommandOption,
} from '../../index'

export class FakeCommand extends BaseCommand {

  public get name(): string {
    return 'FakeCommand'
  }

  public get descriptor(): string {
    return 'NIP13(' + this.context.revision + '):fake:0'
  }

  public async synchronize(): Promise<boolean> {
    return true
  }

  public canExecute(
    actor: PublicAccount,
    argv: CommandOption[] | undefined,
  ): AllowanceResult {
    return new AllowanceResult(true)
  }

  public execute(
    actor: PublicAccount,
    argv: CommandOption[] | undefined,
  ): TransactionURI<Transaction> {
    return new TransactionURI('', TransactionMapping.createFromPayload)
  }

  protected prepare(): AggregateTransaction | Transaction {
    return AggregateTransaction.createBonded(
      this.context.parameters.deadline,
      this.transactions,
      this.context.network.networkType,
      [],
      this.context.parameters.maxFee,
    )
  }

  protected get transactions(): Transaction[] {
    return []
  }
}
