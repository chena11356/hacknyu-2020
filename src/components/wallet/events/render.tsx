import { h } from '@stencil/core'
// import { has as loHas } from 'lodash-es'

export default function render() {
  return [
    <stellar-prompt prompter={this.prompter} />,
    this.error ? <pre class="error">{JSON.stringify(this.error, null, 2)}</pre> : null,
    this.account
    ? [
      <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="" />
          <meta name="author" content="" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js" crossorigin="anonymous"></script>
      </head>,

        <div id="layoutSidenav">
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid">
                        <h1 class="mt-4">{this.account.accountTitle}</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">{this.account.accountMessage}</li>
                        </ol>
                        <div class="row">
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-primary text-white mb-4">
                                    <div class="card-body">
                                      <h4 class="mb-3">Account Details</h4>
                                      <p>Your account key is:</p>
                                      <pre class="balance-pre">{this.account.publicKey}</pre>
                                      <button type="button" class="btn btn-light btn-sm btn-block" onClick={() => this.copyAddress()}>Copy Address</button>
                                      <button type="button" class="btn btn-light btn-sm btn-block" onClick={() => this.copySecret()}>Copy Secret</button>
                                      <button type="button" class="btn btn-light btn-sm btn-block" onClick={() => this.signOut()}>Delete Account</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-warning text-white mb-4">
                                    <div class="card-body">
                                      <h4 class="mb-3">Make Transactions</h4>
                                      <button type="button" class="btn btn-light btn-sm btn-block" onClick={() => this.trustAsset()}>Trust Asset</button>
                                      <button type="button" class="btn btn-light btn-sm btn-block" onClick={() => this.makePayment()}>Make Payment</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-success text-white mb-4">
                                    <div class="card-body">
                                      <h4 class="mb-3">View Balances</h4>
                                      <pre class="mb-3 balance-pre">{ this.parseBalances() }</pre>
                                      <button type="button" class="btn btn-light btn-sm btn-block" onClick={() => this.updateAccount(true)}>Update Account</button>
                                      <button type="button" class="btn btn-light btn-sm btn-block" onClick={() => this.viewBalances()}>View Balances</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-danger text-white mb-4">
                                    <div class="card-body">
                                      <h4 class="mb-3">View Transactions</h4>
                                      <pre class="account-state" id="account-state-text">{ "[List of transactions]" }</pre>
                                      <button type="button" class="btn btn-light btn-sm btn-block" onClick={() => this.updateAccount(true)}>Update Account</button>
                                      <button type="button" class="btn btn-light btn-sm btn-block" onClick={() => this.viewTransactions()}>View Transactions</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="card mb-4">
                                    <div class="card-header"><i class="fas fa-chart-area mr-1"></i>Area Chart Example</div>
                                    <div class="card-body"><img src="https://i.ibb.co/k8QGSpz/area-Chart-Example.png" alt="area chart"></img></div>
                                </div>
                            </div>
                            <div class="col-xl-6">
                                <div class="card mb-4">
                                    <div class="card-header"><i class="fas fa-chart-bar mr-1"></i>Budget Proportion Example</div>
                                    <div class="card-body"><img src={this.account.pieChartURL} alt="pie chart"></img></div>
                                </div>
                            </div>
                        </div>

                        <div class="card mb-4">
                            <div class="card-header"><i class="fas fa-table mr-1"></i>{this.account.tableTitle}</div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <tr>
                                                <td>Tiger Nixon</td>
                                                <td>System Architect</td>
                                                <td>Main Campus</td>
                                                <td>61</td>
                                                <td>2011/04/25</td>
                                                <td>$320,800</td>
                                            </tr>
                                            <tr>
                                                <td>Garrett Winters</td>
                                                <td>Custodian</td>
                                                <td>Science Building</td>
                                                <td>63</td>
                                                <td>2011/07/25</td>
                                                <td>$170,750</td>
                                            </tr>
                                            <tr>
                                                <td>Ashton Cox</td>
                                                <td>Substitute Teacher</td>
                                                <td>Science Building</td>
                                                <td>66</td>
                                                <td>2009/01/12</td>
                                                <td>$86,000</td>
                                            </tr>
                                            <tr>
                                                <td>Cedric Kelly</td>
                                                <td>Teacher</td>
                                                <td>Main Campus</td>
                                                <td>22</td>
                                                <td>2012/03/29</td>
                                                <td>$433,060</td>
                                            </tr>
                                            <tr>
                                                <td>Airi Satou</td>
                                                <td>Teacher</td>
                                                <td>Science Building</td>
                                                <td>33</td>
                                                <td>2008/11/28</td>
                                                <td>$162,700</td>
                                            </tr>
                                            <tr>
                                                <td>Brielle Williamson</td>
                                                <td>Principal</td>
                                                <td>Science Building</td>
                                                <td>61</td>
                                                <td>2012/12/02</td>
                                                <td>$372,000</td>
                                            </tr>
                                            <tr>
                                                <td>Herrod Chandler</td>
                                                <td>Guidance Counselor</td>
                                                <td>Main Campus</td>
                                                <td>59</td>
                                                <td>2012/08/06</td>
                                                <td>$137,500</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Bloool 2019</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>,
    ]
    : <button class="btn btn-primary" type="button" onClick={() => this.createAccount()}>{this.loading.fund ? <stellar-loader /> : null} Create Account</button>,

    this.account ? [

    ] : null,
  ]
}
