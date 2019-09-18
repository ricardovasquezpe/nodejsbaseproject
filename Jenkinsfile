pipeline {
    agent any
    stages{
        node("slave") {
            stage("one") {
                echo "One"
            }
            stage("two") {
                echo "two"
            }
            stage("three") {
                echo "three"
            }
        }
    }
}
