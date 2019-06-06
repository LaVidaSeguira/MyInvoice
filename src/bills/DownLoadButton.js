import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import QueueIcon from '@material-ui/icons/ArrowDownward';
import { showNotification } from 'react-admin';
import { push } from 'react-router-redux';

class DownLoadButton extends Component {
    handleClick = () => {
      const { push, record, showNotification } = this.props;
        fetch(`http://localhost:8080/bill/${record.id}/download.xls`)
          .then(res => res.blob().then(blob => {
            let filename=`download.xls`
            let a = document.createElement('a');
            let url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
            showNotification('成功：下载任务');
            push('/bill');
          }))
            .catch((e) => {
                showNotification('错误: 下载遇到问题', 'error')
            });
    }

    render() {
        return <Button color="primary" onClick={this.handleClick}><QueueIcon/></Button>;
    }
}

DownLoadButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification,
    push,
})(DownLoadButton);
