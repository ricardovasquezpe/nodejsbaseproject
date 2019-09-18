pipeline {
    agent any
    
    environment {
        SLACK_CHANNEL = "#jenkins"
        SLACK_TEAM_DOMAIN = "MY-SLACK-TEAM"
        SLACK_TOKEN = credentials("slack")
        DEPLOY_URL = "https://deployment.example.com/"
    }
    
    stages{
        stage('Notificar') {
            steps {
                slackSend(
                            channel: "${env.SLACK_CHANNEL}",
                            color: "good",
                            message: "${env.STACK_PREFIX} production deploy: *${env.DEPLOY_VERSION}*. <${env.DEPLOY_URL}|Access service> - <${env.BUILD_URL}|Check build>"
                    )
            
            }
        }
        
        stage('Slave'){
            agent { node { label "slave" } }
            steps{
                //dir("${env.WORKSPACE}/nodejsbaseproject"){
                    script{
                        sh 'echo "Holi Slave"'
                    }
                //}
            }
        }
        
        stage('StartUp'){
            steps{
                //dir("${env.WORKSPACE}/nodejsbaseproject"){
                    script{
                        sh 'npm install'
                    }
                //}
            }
        }
        
        stage('Testing'){
            steps{
                //dir("${env.WORKSPACE}/nodejsbaseproject"){
                    script{
                        sh 'npm run test'
                    }
                //}
            }
            post {
                failure{
                    echo 'Tests failed'
                }
                always {
                  //step([$class: 'CoberturaPublisher', coberturaReportFile: 'nodejsbaseproject/output/coverage/jest/cobertura-coverage.xml'])
                  //junit 'nodejsbaseproject/test_results/junit/junit.xml'
                    junit 'test_results/junit/junit.xml'
                }
            }
        }
        stage('Build') {
            steps {
                //dir("${env.WORKSPACE}/nodejsbaseproject"){
                    script {
                        sh 'npm run build'
                    }
                //}
            }
            post{
                success{
                    echo "${env.BUILD_URL} has result success"
                }
                failure{
                    emailext body: 'Error on Jenkins Build ${env.BUILD_URL}', recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: 'Jenkins Error'
                }
                aborted {
                    echo "Aborted"
                }
            }
        }
        stage('Deploy') {
            /*when {
                expression {
                    currentBuild.previousBuild.result == 'SUCCESS'
                }
            }*/
            steps {
                script {
                    sh 'npm start'
                }
            }
        }
    }
}
