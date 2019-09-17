pipeline {
    agent any
    stages{
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
