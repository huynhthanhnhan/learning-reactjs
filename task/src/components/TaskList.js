import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var filterObject = {
            name: name === 'filterName' ? value : this.props.filter.name,
            status: name === 'filterStatus' ? value : this.props.filter.status
        };
        this.props.onFilterTable(filterObject)
        this.setState({
            [name]: value
        });
    }

    render() {
        var { tasks, filter } = this.props;

        if(filter.name){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1
            });
        }
        tasks = tasks.filter((task) => {
            if(filter.status === -1){
                return task;
            }else{
                return task.status === (filter.status === 1 ? true : false);
            }
        });

        var elmTasks = tasks.map((task, index) => {
            return (
                <TaskItem
                    key={task.id}
                    task={task}
                    index={index + 1}
                />
            )
        });
        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="filterName"
                                        onChange={this.onChange}
                                        value={this.state.filerName}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        name="filterStatus"
                                        onChange={this.onChange}
                                        value={this.state.filterStatus}
                                    >
                                        <option value={-1}>Tất Cả</option>
                                        <option value={0}>Ẩn</option>
                                        <option value={1}>Kích Hoạt</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {elmTasks}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        tasks: state.tasks,
        filter: state.filter
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return{
        onFilterTable: (filter)=>{
            dispatch(actions.filterTask(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
