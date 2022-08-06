import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenseAction } from '../redux/actions';
// import Table from 'react-bootstrap';

class Table extends Component {
  // qdo clica no botão exclui a linha
 handleClick = (id) => {
   const { deleteDespesa } = this.props;
   deleteDespesa(id);
 }

 render() {
   const { expenses } = this.props;
   return (
   // Comp Table
     <table border="1">
       <thead>
         <tr>
           <th>Descrição</th>
           <th>Tag</th>
           <th>Método de pagamento</th>
           <th>Valor</th>
           <th>Moeda</th>
           <th>Câmbio utilizado</th>
           <th>Valor convertido</th>
           <th>Moeda de conversão</th>
           <th>Editar/Excluir</th>
         </tr>
       </thead>

       <tbody>
         { expenses.map((expense) => (
           <tr key={ expense.id }>
             <td>{expense.description}</td>
             <td>{expense.tag}</td>
             <td>{expense.method}</td>
             <td>{Number(expense.value).toFixed(2)}</td>
             <td>{expense.exchangeRates[expense.currency].name}</td>
             <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
             <td>
               {Number(expense.value * expense.exchangeRates[expense.currency].ask)
                 .toFixed(2)}
             </td>
             <td>Real</td>
             <td>
               <button
                 type="button"
                 // onClick={ () => this.handleClick(id) }
                 data-testid="edit-btn"
               >
                 Editar
               </button>

               <button
                 type="button"
                 onClick={ () => this.handleClick(expense.id) }
                 data-testid="delete-btn"
               >
                 Excluir
               </button>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
   );
 }
}

// buscando as informações do estado global
const mapStateToProps = ({ wallet }) => ({
  ...wallet,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDespesa: (id) => {
    // console.log('mapDispatchToProps', id);
    dispatch(deleteExpenseAction(id));
  },
});

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  deleteDespesa: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
