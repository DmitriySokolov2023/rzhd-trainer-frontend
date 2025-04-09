import Layout from '../../layout/Layout'
import styles from './Tasks.module.scss'

const Tasks = () => {
	return (
		<Layout>
			<div className={styles.tasks}>
				<div className={styles.tasks__task}>
					<div className={styles.task__title}>Task</div>
					<div className={styles.task__status}>x</div>
				</div>
				<div className={styles.tasks__task}>
					<div className={styles.task__title}>Task</div>
					<div className={styles.task__status}>x</div>
				</div>
				<div className={styles.tasks__task}>
					<div className={styles.task__title}>Task</div>
					<div className={styles.task__status}>x</div>
				</div>
				<div className={styles.tasks__task}>
					<div className={styles.task__title}>Task</div>
					<div className={styles.task__status}>x</div>
				</div>
			</div>
		</Layout>
	)
}
export default Tasks
